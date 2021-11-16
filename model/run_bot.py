import argparse
from common_args import apply_common_args
from sample import sample_model_func
from requests import get as requestget
from requests import post as requestpost
import json
from time import sleep

def send_bot_message(token, channel, body):
    body = body.replace('#', '%23')
    body = body.replace('@', '%40')
    body = body.replace('&', '%26')
    body = body.replace('?', '%3F')
    body = body.replace('=', '%3D')
    body = body.replace('+', '%2B')
    body = body.replace(' ', '%20')
    body = body.replace('\n', '%0A')

    response = requestget(f"https://x.glowman554.gq/api/message?token={token}&channel={channel}&body={body.replace('#', '%23')}")

    if response.text.strip() != "Message sent":
        print(response.text)
        raise Exception("Failed to send message")

def send_self_bot_message(token, channel, body):
    while True:
        response = requestpost(f"https://discord.com/api/v9/channels/{channel}/messages", json={"content": body}, headers={"Authorization": token})
        if response.status_code != 200:
            print(response.text)
            reason = json.loads(response.text)
            if reason['code'] == 20028 or reason["code"] == 20016:
                print("Rate limited, waiting " + str(reason['retry_after']) + " seconds")
                sleep(reason["retry_after"])
            else:
                raise Exception("Failed to send message")
        else:
            break


def main():
	parser = argparse.ArgumentParser(description='Interact with the model')
	apply_common_args(parser, allow_restore=True)
	parser.add_argument('--unconditional', action='store_true', help='Run the model in unconditional mode')
	parser.add_argument('--token', type=str, help='The token to use for the bot', required=True)
	parser.add_argument('--channel', type=str, help='The channel to send the message to', required=True)
	parser.add_argument('--self_bot', action='store_true', help='Send the message using a normal discord account')

	args = parser.parse_args()

	def _input_func(output, _input):
		model_response = "{}{}".format(_input if _input else "", output.replace("<nl>", "\n"))
		print("Model response >>>\n" + model_response)
		if args.self_bot:
			send_self_bot_message(args.token, args.channel, model_response)
		else:
			send_bot_message(args.token, args.channel, model_response)

	sample_model_func(model_name=args.model_name, models_dir=args.models_dir, checkpoint_dir=args.checkpoint_dir, run_name=args.run_name, restore_from=args.restore_from, sample_func_input=(lambda: input("Model prompt >>> ")) if not args.unconditional else None, sample_func_output=_input_func)

if __name__ == '__main__':
	main()