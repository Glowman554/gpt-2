import { update_console_line } from "./util.js";

export async function process_files(num_files, path, output_path, file_extension) {
	var num_files_processed = 0;

	for (var i = 0; i < num_files; i++) {
		update_console_line(i + 1, num_files, `Processing...`);
		var file = Deno.readTextFileSync(`${path}/${i}.${file_extension}`);

		file = file.replace(/\n/g, "<nl>");
		file = file.replace(/\r/g, "");
		file = file.split("<nl><nl>");

		for (var j = 0; j <  file.length; j++) {
			if (file[j].length < 1024 && file[j].trim() != "") {
				Deno.writeTextFileSync(`${output_path}/${num_files_processed++}.${file_extension}`, file[j]);
			}
		}

		Deno.removeSync(`${path}/${i}.${file_extension}`);
	}

	return num_files_processed;
}

export async function merge_dataset(num_files_processed, path, file_extension) {
	var dataset = [];

	for (var i = 0; i < num_files_processed; i++) {
		update_console_line(i + 1, num_files_processed, `Merging...`);

		var file = Deno.readTextFileSync(`${path}/${i}.${file_extension}`);
		dataset.push(file.toString());
		Deno.removeSync(`${path}/${i}.${file_extension}`);
	}

	return dataset;
}