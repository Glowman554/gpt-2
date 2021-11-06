import json
from encoder import get_encoder
import tensorflow.compat.v1 as tf

import model
import os
import numpy as np

def top_k_logits(logits, k):
	if k == 0:
		# no truncation
		return logits

	def _top_k():
		values, _ = tf.nn.top_k(logits, k=k)
		min_values = values[:, -1, tf.newaxis]
		return tf.where(
			logits < min_values,
			tf.ones_like(logits, dtype=logits.dtype) * -1e10,
			logits,
		)
	return tf.cond(
	   tf.equal(k, 0),
	   lambda: logits,
	   lambda: _top_k(),
	)


def top_p_logits(logits, p):
	with tf.variable_scope('top_p_logits'):
		logits_sort = tf.sort(logits, direction='DESCENDING')
		probs_sort = tf.nn.softmax(logits_sort)
		probs_sums = tf.cumsum(probs_sort, axis=1, exclusive=True)
		logits_masked = tf.where(probs_sums < p, logits_sort, tf.ones_like(logits_sort)*1000) # [batchsize, vocab]
		min_logits = tf.reduce_min(logits_masked, axis=1, keepdims=True) # [batchsize, 1]
		return tf.where(
			logits < min_logits,
			tf.ones_like(logits, dtype=logits.dtype) * -1e10,
			logits,
		)


def sample_sequence(*, hparams, length, start_token=None, batch_size=None, context=None, temperature=1, top_k=0, top_p=0.0):
	if start_token is None:
		assert context is not None, 'Specify exactly one of start_token and context!'
	else:
		assert context is None, 'Specify exactly one of start_token and context!'
		context = tf.fill([batch_size, 1], start_token)

	def step(hparams, tokens, past=None):
		lm_output = model.model(hparams=hparams, X=tokens, past=past, reuse=tf.AUTO_REUSE)

		logits = lm_output['logits'][:, :, :hparams.n_vocab]
		presents = lm_output['present']
		presents.set_shape(model.past_shape(hparams=hparams, batch_size=batch_size))
		return {
			'logits': logits,
			'presents': presents,
		}

	with tf.name_scope('sample_sequence'):
		def body(past, prev, output):
			next_outputs = step(hparams, prev, past=past)
			logits = next_outputs['logits'][:, -1, :]  / tf.to_float(temperature)
			if top_p > 0.0:
				logits = top_p_logits(logits, p=top_p)
			else:
				logits = top_k_logits(logits, k=top_k)
			samples = tf.multinomial(logits, num_samples=1, output_dtype=tf.int32)
			return [
				next_outputs['presents'] if past is None else tf.concat([past, next_outputs['presents']], axis=-2),
				samples,
				tf.concat([output, samples], axis=1)
			]

		past, prev, output = body(None, context, context)

		def cond(*args):
			return True

		_, _, tokens = tf.while_loop(
			cond=cond, body=body,
			maximum_iterations=length - 1,
			loop_vars=[
				past,
				prev,
				output
			],
			shape_invariants=[
				tf.TensorShape(model.past_shape(hparams=hparams, batch_size=batch_size)),
				tf.TensorShape([batch_size, None]),
				tf.TensorShape([batch_size, None]),
			],
			back_prop=False,
		)

		return tokens

def sample_model(model_name="124M", seed=None, length=100, temperature=1, top_k=0, top_p=1, models_dir='models', checkpoint_dir="checkpoint", run_name="run1", restore_from="latest", num_samples=1, batch_size=None, raw_input="<|endoftext|>"):
	models_dir = os.path.expanduser(os.path.expandvars(models_dir))

	if batch_size is None:
		batch_size = 1
	assert num_samples % batch_size == 0

	enc = get_encoder(model_name, models_dir)
	hparams = model.default_hparams()

	with open(os.path.join(models_dir, model_name, 'hparams.json')) as f:
		hparams.override_from_dict(json.load(f))
	
	if length is None:
		length = hparams.n_ctx // 2
	elif length > hparams.n_ctx:
		raise ValueError("Can't get samples longer than window size: %s" % hparams.n_ctx)
	
	with tf.Session(graph=tf.Graph()) as sess:
		np.random.seed(seed)
		tf.set_random_seed(seed)

		if raw_input == "<|endoftext|>":
			output = sample_sequence(
				hparams=hparams, length=length,
				start_token=enc.encoder['<|endoftext|>'],
				batch_size=batch_size,
				temperature=temperature, top_k=top_k, top_p=top_p
			)[:, 1:]
		else:
			context = tf.placeholder(tf.int32, [batch_size, None])
			output = sample_sequence(
				hparams=hparams, length=length,
				context=context,
				batch_size=batch_size,
				temperature=temperature, top_k=top_k, top_p=top_p
			)
			
		saver = tf.train.Saver()
		if restore_from == 'latest':
			ckpt = tf.train.latest_checkpoint(os.path.join(checkpoint_dir, run_name))
			if ckpt is None:
				# Get fresh GPT weights if new run.
				ckpt = tf.train.latest_checkpoint(os.path.join('models', model_name))
		elif restore_from == 'fresh':
			ckpt = tf.train.latest_checkpoint(os.path.join('models', model_name))
		else:
			ckpt = tf.train.latest_checkpoint(restore_from)
		
		print('Loading checkpoint', ckpt)
		saver.restore(sess, ckpt)

		generated = []

		while num_samples > 0:
			num_samples -= batch_size
			if raw_input == "<|endoftext|>":
				out = sess.run(output)
			else:
				context_tokens = enc.encode(raw_input)
				out = sess.run(output, feed_dict={
					context: [context_tokens for _ in range(batch_size)]
				})[:, len(context_tokens):]

			for i in range(batch_size):
				generated.append(enc.decode(out[i]))
		
		return generated


def sample_model_func(model_name="124M", seed=None, length=100, temperature=1, top_k=0, top_p=1, models_dir='models', checkpoint_dir="checkpoint", run_name="run1", restore_from="latest", batch_size=None, sample_func_input=None, sample_func_output=None):
	models_dir = os.path.expanduser(os.path.expandvars(models_dir))

	if batch_size is None:
		batch_size = 1

	enc = get_encoder(model_name, models_dir)
	hparams = model.default_hparams()

	with open(os.path.join(models_dir, model_name, 'hparams.json')) as f:
		hparams.override_from_dict(json.load(f))
	
	if length is None:
		length = hparams.n_ctx // 2
	elif length > hparams.n_ctx:
		raise ValueError("Can't get samples longer than window size: %s" % hparams.n_ctx)
	
	with tf.Session(graph=tf.Graph()) as sess:
		np.random.seed(seed)
		tf.set_random_seed(seed)

		if not sample_func_input:
			output = sample_sequence(
				hparams=hparams, length=length,
				start_token=enc.encoder['<|endoftext|>'],
				batch_size=batch_size,
				temperature=temperature, top_k=top_k, top_p=top_p
			)[:, 1:]
		else:
			context = tf.placeholder(tf.int32, [batch_size, None])
			output = sample_sequence(
				hparams=hparams, length=length,
				context=context,
				batch_size=batch_size,
				temperature=temperature, top_k=top_k, top_p=top_p
			)
			
		saver = tf.train.Saver()
		if restore_from == 'latest':
			ckpt = tf.train.latest_checkpoint(os.path.join(checkpoint_dir, run_name))
			if ckpt is None:
				# Get fresh GPT weights if new run.
				ckpt = tf.train.latest_checkpoint(os.path.join('models', model_name))
		elif restore_from == 'fresh':
			ckpt = tf.train.latest_checkpoint(os.path.join('models', model_name))
		else:
			ckpt = tf.train.latest_checkpoint(restore_from)
		
		print('Loading checkpoint', ckpt)
		saver.restore(sess, ckpt)

		while True:
			if not sample_func_input:
				out = sess.run(output)
			else:
				raw_input = sample_func_input()
				context_tokens = enc.encode(raw_input)
				out = sess.run(output, feed_dict={
					context: [context_tokens for _ in range(batch_size)]
				})[:, len(context_tokens):]

			for i in range(batch_size):
				sample_func_output(enc.decode(out[i]), raw_input if sample_func_input else None)