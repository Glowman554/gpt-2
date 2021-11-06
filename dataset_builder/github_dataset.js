import { exec } from 'https://deno.land/x/exec/mod.ts';
import getFiles from "./deno-getfiles/mod.ts";
import { ArgParser } from "./core/argparser.js";
import { merge_dataset, process_files } from "./core/common.js";
import { update_console_line } from "./core/util.js";
import { debug_log } from "./core/logger.js";
import { write_title } from "./core/figlet.js";

export async function fetch_repos(query, token, num = 1000, callback = console.log) {
	var result = [];
	while (result.length < num) {
		var response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=100&page=${result.length / 100 + 1}`, {
			headers: {
				"Authorization": `token ${token}`
			}
		});
		var json = await response.json();

		try {
			//console.log(`Fetched ${json.items.length} repos`);

			for (var i = 0; i < json.items.length; i++) {
				debug_log(`Fetched ${json.items[i].clone_url}`);
				result.push(json.items[i].clone_url);
			}

			callback(result.length, num);

		} catch (e) {
			debug_log(`Failed to fetch repos: ${e}`);
			debug_log(`${JSON.stringify(json)}`);
		}
	}

	if (result.length > num) {
		result = result.slice(0, num);
	}

	return result;
}

async function clone_and_filter(repos, output_path, file_extension) {
	var num_files = 0;

	for (var i = 0; i < repos.length; i++) {
		var old_num_files = num_files;

		update_console_line(i + 1, repos.length, `Cloning ${repos[i]}...`);
		debug_log(`Cloning ${repos[i]}...`);

		var clone_id = Math.floor(Math.random() * 1000000);

		var command = `git clone ${repos[i]} ${clone_id} --depth=1`;
		var result = await exec(command);

		var files = getFiles("./" + String(clone_id) + "/");	
		for (var j = 0; j < files.length; j++) {
			if (files[j].ext == file_extension) {
				await Deno.copyFile(files[j].path, `${output_path}/${num_files++}.${file_extension}`);
			}
		}

		debug_log(`Deleting ${clone_id}...`);

		await Deno.remove(String(clone_id), { recursive: true });

		debug_log(`The clone got ${num_files - old_num_files} .${file_extension} files`);
	}

	return num_files;
}

async function main() {
	await write_title("GitHub");

	var parser = new ArgParser(Deno.args, [
		"--file_extension",
		"--query",
		"--count",
		"--token",
		"--save-path",
	]);
	
	parser.parse();

	var file_extension = parser.consume_option("--file_extension", "js");
	var query = parser.consume_option("--query", "language:javascript");
	var count = parser.consume_option("--count", "10");
	var token = parser.consume_option("--token");
	var save_path = parser.consume_option("--save-path", "dataset.txt");


	var tmp_folder_path = "./tmp";
	var tmp_folder_path_processed = "./tmp_processed";

	await Deno.mkdir(tmp_folder_path, { recursive: true });
	await Deno.mkdir(tmp_folder_path_processed, { recursive: true });

	var repos = await fetch_repos(query, token, parseInt(count), (i, n) => update_console_line(i, n, `Fetching repos...`));
	var num_files = await clone_and_filter(repos, tmp_folder_path, file_extension);
	var num_files_processed = await process_files(num_files, tmp_folder_path, tmp_folder_path_processed, file_extension);
	var dataset = await merge_dataset(num_files_processed, tmp_folder_path_processed, file_extension);

	console.log(`\nSaving dataset to ${save_path}`);

	Deno.writeTextFile(save_path, dataset.join("\n"));

	await Deno.remove(tmp_folder_path, { recursive: true });
	await Deno.remove(tmp_folder_path_processed, { recursive: true });
}

await main();