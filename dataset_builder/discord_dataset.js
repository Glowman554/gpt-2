import { ArgParser } from "./core/argparser.js";
import { merge_dataset, process_files } from "./core/common.js";
import { update_console_line } from "./core/util.js";
import { debug_log } from "./core/logger.js";
import { write_title } from "./core/figlet.js";

async function fetch_messages(token, channel_id, limit = null) {
	var more = true;
	var messages = [];
	var num_messages = 0;
	var last_message_id = null;

	while (more) {
		var response = await fetch(`https://discord.com/api/v9/channels/${channel_id}/messages?limit=100${last_message_id ? ("&before=" + last_message_id) : ""}`, {
			headers: {
				"Authorization": `${token}`,
			}
		});

		if (response.status != 200) {
			debug_log(`Error fetching messages: ${response.status}`);
			continue;
		}

		var data = await response.json();

		for (var i = 0; i < data.length; i++) {
			messages.push(data[i].content);
			num_messages++;
		}

		debug_log(`${data.length} messages fetched. Fetched from ${last_message_id} to ${ data[data.length - 1].id}! Fetched ${num_messages} messages total!`);

		last_message_id = data[data.length - 1].id;

		if (data.length < 100) {
			more = false;
		}

		if (limit && num_messages >= limit) {
			more = false;
		}

		update_console_line(messages.length, limit ? limit : "unk", "Fetching messages for " + channel_id + "...");
	}

	return messages;
}

async function download_messages(count, output_path, token, channel_ids) {
	var messages = [];
	for (var i = 0; i < channel_ids.length; i++) {
		var channel_id = channel_ids[i];
		var messages_fetched = await fetch_messages(token, channel_id, count);
		messages = messages.concat(messages_fetched);

		if (messages.length >= count) {
			break;
		}
	}

	debug_log(`Writing messages to ${output_path}`);
	for (let i = 0; i < messages.length; i++) {
		update_console_line(i, messages.length, "Saving messages...");
		await Deno.writeTextFile(output_path + `/${i}.txt`, messages[i]);
	}

	debug_log(`Done!`);

	return messages.length;
}

async function main() {
	await write_title("Discord");
	var parser = new ArgParser(Deno.args, [
		"--count",
		"--save-path",
		"--token",
		"--channels",
	]);
	
	parser.parse();

	var count = parser.consume_option("--count", "1000");
	var save_path = parser.consume_option("--save-path", "dataset.txt");
	var token = parser.consume_option("--token");
	var channels = parser.consume_option("--channels").split(",");


	var tmp_folder_path = "./tmp";
	var tmp_folder_path_processed = "./tmp_processed";

	await Deno.mkdir(tmp_folder_path, { recursive: true });
	await Deno.mkdir(tmp_folder_path_processed, { recursive: true });

	var num_files = await download_messages(parseInt(count), tmp_folder_path, token, channels);
	var num_files_processed = await process_files(num_files, tmp_folder_path, tmp_folder_path_processed, "txt");
	var dataset = await merge_dataset(num_files_processed, tmp_folder_path_processed, "txt");

	console.log(`\nSaving dataset to ${save_path}`);

	Deno.writeTextFile(save_path, dataset.join("\n"));

	await Deno.remove(tmp_folder_path, { recursive: true });
	await Deno.remove(tmp_folder_path_processed, { recursive: true });
}

await main();