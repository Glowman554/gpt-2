import { ArgParser } from "./core/argparser.js";
import { csv } from "./core/csv.js";
import { write_title } from "./core/figlet.js";

async function main() {
	await write_title("Query");
	var parser = new ArgParser(Deno.args, [
		"--query",
		"--summary"
	]);

	parser.parse();

	var query = parser.consume_option("--query");
	var summary_dir = parser.consume_option("--summary", "output");

	var summary_data = Deno.readTextFileSync(summary_dir + "/words.csv");
	var summary_csv = new csv(summary_data);

	summary_csv.parse();

	var result_csv = new csv();

	result_csv.pushRow(["Word", "Occurrences", "Percentage"]);
	result_csv.pushRow(["", "", ""]);

	summary_csv.query(query, 0).forEach(row => result_csv.pushRow(row));
	

	Deno.writeTextFileSync(summary_dir + "/query.csv", result_csv.serialize());

	var excel_csv_copy = new csv();
	excel_csv_copy.parsed_document = Object.assign([], result_csv.parsed_document);
	excel_csv_copy.parsed_document= excel_csv_copy.parsed_document.map(row => row.map(cell => cell.indexOf("%") != 1 ? cell.replace(/\./g, ",") : cell));

	Deno.writeTextFileSync(summary_dir + "/query-excel.csv", excel_csv_copy.serialize(";"));

	console.log(result_csv.str());
}

await main();