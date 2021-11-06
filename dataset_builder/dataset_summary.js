import { ArgParser } from "./core/argparser.js";
import { csv } from "./core/csv.js";
import { write_title } from "./core/figlet.js";

function calculate_average_text_length(text) {
	var full_length = 0;
	
	for (var i = 0; i < text.length; i++) {
		full_length += text[i].length;
	}

	return Math.round(full_length / text.length);
}

function generate_word_list(text) {
	var word_list = [];
	
	for (var i = 0; i < text.length; i++) {
		var words = text[i].split(" ");

		words = words.map(word => word.toLowerCase());
		words = words.map(word => word.replace(/<nl>/gm, " "));
		words = words.map(word => word.replace(/^(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/gm, "" ));
		words = words.map(word => word.replace(/[^a-zA-Z']/g, " "));
		words = words.map(word => word.trim());
		words = words.map(word => word.replace(/  /g, " "));
		words = words.join(" ").split(" ");

		for (var j = 0; j < words.length; j++) {
			if (words[j] != "") {
				if (word_list.find(word => word.word == words[j]) == undefined) {
					word_list.push({
						word: words[j],
						num_occurrences: 1
					});
				} else {
					word_list[word_list.findIndex(word => word.word == words[j])].num_occurrences++;
				}
			}
		}
	}

	var num_words_used = 0;
	for (var i = 0; i < word_list.length; i++) {
		num_words_used += word_list[i].num_occurrences;
	}

	// calculate the percentage of the word for each word
	for (var i = 0; i < word_list.length; i++) {
		word_list[i].percentage = (word_list[i].num_occurrences / num_words_used) * 100;
	}
	
	return word_list;
}

async function main() {
	await write_title("Summary");

	var parser = new ArgParser(Deno.args, [
		"--output",
		"--input"
	]);

	parser.parse();

	var output_dir = parser.consume_option("--output", "output");
	var input_file = parser.consume_option("--input", "dataset.txt");

	try {
		if (!Deno.lstatSync(output_dir).isDirectory) {
			Deno.mkdirSync(output_dir);
		}
	} catch (e) {
		Deno.mkdirSync(output_dir);
	}

	var input_text = Deno.readTextFileSync(input_file).split("\n");

	var summary_object = {};
	summary_object["raw_data"] = input_text;

	summary_object["average_text_length"] = calculate_average_text_length(input_text);

	var word_list = generate_word_list(input_text);
	word_list.sort((a, b) => b.num_occurrences - a.num_occurrences);

	summary_object["word_list"] = word_list;

	var words_csv = new csv();

	words_csv.pushRow(["Word", "Occurrences", "Percentage"]);
	words_csv.pushRow(["", "", ""]);

	for (var i = 0; i < word_list.length; i++) {
		words_csv.pushRow([word_list[i].word, String(word_list[i].num_occurrences), String(word_list[i].percentage) + "%"]);
	}

	Deno.writeTextFileSync(output_dir + "/words.csv", words_csv.serialize());

	var excel_csv_copy = new csv();
	excel_csv_copy.parsed_document = Object.assign([], words_csv.parsed_document);
	excel_csv_copy.parsed_document= excel_csv_copy.parsed_document.map(row => row.map(cell => cell.indexOf("%") != 1 ? cell.replace(/\./g, ",") : cell));

	Deno.writeTextFileSync(output_dir + "/words-excel.csv", excel_csv_copy.serialize(";"));
	Deno.writeTextFileSync(output_dir + "/words.txt", words_csv.str());
	Deno.writeTextFileSync(output_dir + "/summary.json", JSON.stringify(summary_object, null, 4));

	var output_csv = new csv();

	output_csv.pushRow(["", ""]);
	output_csv.pushRow(["Average Text Length", String(summary_object["average_text_length"])]);
	output_csv.pushRow(["", ""]);

	output_csv.pushRow(["20 Most used words", "count"]);
	output_csv.pushRow(["", ""]);

	for (var i = 0; i < 20; i++) {
		output_csv.pushRow([word_list[i].word, String(word_list[i].num_occurrences)]);
	}

	console.log(output_csv.str());

	Deno.writeTextFileSync(output_dir + "/summary.csv", output_csv.serialize());

	var output_excel_csv_copy = new csv();
	output_excel_csv_copy.parsed_document = Object.assign([], output_csv.parsed_document);
	
	Deno.writeTextFileSync(output_dir + "/summary-excel.csv", output_excel_csv_copy.serialize(";"));

	Deno.writeTextFileSync(output_dir + "/summary.txt", output_csv.str());
}

await main();