
export function debug_log(what) {
	const date = new Date(Date.now()).toUTCString();
	var log_entry = "[" + date + "] " + what;


	var log_file = ".dataset_builder.log";

	try {
		if (!Deno.lstatSync(log_file).isFile) {
			Deno.writeTextFileSync(log_file, "----- Log file created -----\n");
		}
	} catch (e) {
		Deno.writeTextFileSync(log_file, "----- Log file created -----\n");
	}

	Deno.writeTextFileSync(log_file, log_entry + "\n", { append: true });
}