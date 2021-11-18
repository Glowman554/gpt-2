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
	sudo cp bin/$1 /bin/$1 &> /dev/null || (printf "\nFailed to copy $1\n" && exit 1)
	printf "[\033[32mOK\033[0m]\n"
}

function run_cleanup {
	printf "[\033[31m**\033[0m] Cleaning up...\r"
	rm -rf bin/ &> /dev/null || (printf "\nFailed to remove bin/\n" && exit 1)
	rm -rf $HOME/.gpt-2-src &> /dev/null || (printf "\nFailed to remove $HOME/.gm2-src/\n" && exit 1)
	printf "[\033[32mOK\033[0m]\n"
}

function get_deno {
	deno -V &> /dev/null
	if [ $? -eq 0 ]
	then
    		printf "[\033[32m--\033[0m] Installing deno...\n"
    	else
		printf "[\033[31m**\033[0m] Installing deno...\r"
		(curl -fsSL https://deno.land/x/install/install.sh | sh) &> /tmp/deno.log || (printf "\nFailed to install deno\n" && exit 1)
		printf "[\033[32mOK\033[0m]\n"

		local deno_install="${DENO_INSTALL:-$HOME/.deno}"
	
		export DENO_INSTALL="$deno_install"
		export PATH="$DENO_INSTALL/bin:$PATH"

		printf "\n\nexport DENO_INSTALL=\"$deno_install\"\n" >> $HOME/.bashrc
		printf "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"\n" >> $HOME/.bashrc
	fi
}

function setup_repo {
	printf "[\033[31m**\033[0m] Cloning repo...\r"
	git clone https://github.com/Glowman554/gpt-2.git $HOME/.gpt-2-src &> /dev/null || (printf "\nFailed to clone repo\n" && exit 1)
	cd $HOME/.gpt-2-src/dataset_builder
	printf "[\033[32mOK\033[0m]\n"
}

get_deno

setup_repo

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