import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { ArgParser } from "./core/argparser.js";
import { merge_dataset, process_files } from "./core/common.js";
import { update_console_line } from "./core/util.js";
import { debug_log } from "./core/logger.js";
import { write_title } from "./core/figlet.js";

async function download_comments(page = 1) {
	var response = await(await fetch(`https://e621.net/comments?page=${page}`)).text();
	var search_res_dom = new DOMParser().parseFromString(response, 'text/html');

	return Array.from(search_res_dom.querySelectorAll(".content > div.styled-dtext > p")).map(x => x.textContent);
}

async function download_comments_count(count, output_path) {
	var comments = [];
	var page = 1;
	while (comments.length < count) {
		update_console_line(comments.length, count, "Downloading page " + page + "...");
		var page_comments = await download_comments(page++);

		if (page_comments.length == 0) {
			debug_log("No more comments to download.");
			break;
		}
		
		for (var comment of page_comments) {
			comments.push(comment);
		}

		debug_log(`Downloaded ${page_comments.length} comments`);
	}

	debug_log(`Writing comments to ${output_path}`);
	for (let i = 0; i < comments.length; i++) {
		update_console_line(i, comments.length, "Saving comments...");
		await Deno.writeTextFile(output_path + `/${i}.txt`, comments[i]);
	}

	debug_log(`Done!`);

	return comments.length;
}


async function main() {
	await write_title("e621");
	var parser = new ArgParser(Deno.args, [
		"--count",
		"--save-path"
	]);
	
	parser.parse();

	var count = parser.consume_option("--count", "10");
	var save_path = parser.consume_option("--save-path", "dataset.txt");


	var tmp_folder_path = "./tmp";
	var tmp_folder_path_processed = "./tmp_processed";

	await Deno.mkdir(tmp_folder_path, { recursive: true });
	await Deno.mkdir(tmp_folder_path_processed, { recursive: true });

	var num_files = await download_comments_count(parseInt(count), tmp_folder_path);
	var num_files_processed = await process_files(num_files, tmp_folder_path, tmp_folder_path_processed, "txt");
	var dataset = await merge_dataset(num_files_processed, tmp_folder_path_processed, "txt");

	console.log(`\nSaving dataset to ${save_path}`);

	Deno.writeTextFile(save_path, dataset.join("\n"));

	await Deno.remove(tmp_folder_path, { recursive: true });
	await Deno.remove(tmp_folder_path_processed, { recursive: true });
}

await main();