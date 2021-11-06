import argparse

def apply_common_args(parser: argparse.ArgumentParser, allow_restore: bool = True):
	parser.add_argument('--model_name', metavar='MODEL', type=str, default='124M', help='Pretrained model name')
	parser.add_argument('--models_dir', metavar='PATH', type=str, default='models', help='Path to models directory')
	if allow_restore:
		parser.add_argument('--restore_from', type=str, default='latest', help='Either "latest", "fresh", or a path to a checkpoint file')
		parser.add_argument('--run_name', type=str, default='run1', help='Run id. Name of subdirectory in checkpoint/ and samples/')
		parser.add_argument('--checkpoint_dir', type=str, default='checkpoint', help='Path to checkpoint directory')