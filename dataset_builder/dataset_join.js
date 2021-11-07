import { ArgParser } from "./core/argparser.js";
import { write_title } from "./core/figlet.js";
import { update_console_line } from './core/util.js';

async function main() {
	await write_title("Join");
	var parser = new ArgParser(Deno.args, [
		"--input",
		"--output"
	]);

	parser.parse();

	var input = [];
	while (true) {
		try {
			input.push(parser.consume_option("--input"));
		} catch (e) {
			break;
		}
	}

	var output = parser.consume_option("--output", "dataset.txt");

	var dataset = [];

	for (var i = 0; i < input.length; i++) {
		var data = Deno.readTextFileSync(input[i]).split("\n");
		for (let j = 0; j < data.length; j++) {
			update_console_line(j, data.length, "Reading " + input[i]);
			dataset.push(data[j]);
		}
	}

	console.log(`\nSaving dataset to ${output}`);
	Deno.writeTextFileSync(output, dataset.join("\n"));
}

await main();