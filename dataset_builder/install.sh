function build_application {
	#printf "Building application component $1...  "
	printf "[\033[31m**\033[0m] Building application component $1...\r"
	mkdir -p bin &> /dev/null || (printf "\nFailed to create bin/\n $1\n" && exit 1)
	deno bundle --unstable $1.js bin/$1.bundle.js &> /tmp/$1_bunle.log || (printf "\nFailed to build $1\n" && exit 1)
	deno compile --unstable -A bin/$1.bundle.js &> /tmp/$1_compile.log || (printf "\nFailed to compile $1\n" && exit 1)
	mv $1.bundle bin/$1 &> /dev/null || (printf "\nFailed to move $1.bundle\n" && exit 1)
	printf "[\033[32mOK\033[0m]\n"
}

function install_application {
	printf "[\033[31m**\033[0m] Installing application component $1...\r"
	sudo mkdir -p /usr/dataset_builder &> /dev/null || (printf "\nFailed to create /usr/dataset_builder\n" && exit 1)
	sudo cp bin/$1 /bin/$1 &> /dev/null || (printf "\nFailed to copy $1\n" && exit 1)
	sudo cp  bin/$1.bundle.js /usr/dataset_builder/$1.js &> /dev/null || (printf "\nFailed to copy $1.bundle.js\n" && exit 1)
	printf "[\033[32mOK\033[0m]\n"
}

function run_cleanup {
	printf "[\033[31m**\033[0m] Cleaning up...\r"
	rm -rf bin/ &> /dev/null || (printf "\nFailed to remove bin/\n" && exit 1)
	printf "[\033[32mOK\033[0m]\n"
}

build_application discord_dataset
build_application e621_dataset
build_application github_dataset
build_application dataset_summary
build_application dataset_query
build_application dataset_join

install_application discord_dataset
install_application e621_dataset
install_application github_dataset
install_application dataset_summary
install_application dataset_query
install_application dataset_join

run_cleanup