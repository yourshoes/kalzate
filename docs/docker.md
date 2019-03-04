## Getting started

We do recommend using Docker to make sure all members in the team are using the same environment, but if that's not an option, switch to the [Local Setup](#local_setup) section. Otherwise, read the instructions below depending on your host operative system to start working with Docker.

For committing to Github, please fill the `.gitconfig.template` file with your Github account info at the root path and rename it to `.gitconfig`. Consider also the same for `.npmrc.template` if it is required to publish to a private npm registry. Then, create the Docker image (just for the first time) and run it.

### Unix (Linux & OSX)

Create the Docker image by running `./scripts/docker/unix/create_image.sh` and use it by running `./scripts/docker/unix/run_image.sh`

### Windows

Create the Docker image by running `.\scripts\docker\win\create_image.bat` and use it by running `.\scripts\docker\win\run_image.bat`