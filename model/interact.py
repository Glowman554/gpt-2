import argparse
from common_args import apply_common_args
from sample import sample_model_func

def main():
	parser = argparse.ArgumentParser(description='Interact with the model')
	apply_common_args(parser, allow_restore=True)
	parser.add_argument('--unconditional', action='store_true', help='Run the model in unconditional mode')

	args = parser.parse_args()

	sample_model_func(model_name=args.model_name, models_dir=args.models_dir, checkpoint_dir=args.checkpoint_dir, run_name=args.run_name, restore_from=args.restore_from, sample_func_input=(lambda: input("Model prompt >>> ")) if not args.unconditional else None, sample_func_output=lambda output, _input: print("Model response >>>\n{}{}".format(_input if _input else "", output.replace("<nl>", "\n"))))

if __name__ == '__main__':
	main()