#!/usr/bin/env bash
docker_command=$(command -v docker)
image_name="uif-lib-template"
gitconfig_file="$(pwd)/.gitconfig"
npmrc_file="$(pwd)/.npmrc"
git_folder="$(pwd)/.git"
echo ""
echo "#########################################################################"
echo "####            CHECKING DOCKER IS INSTALLED IN THE SYSTEM           ####"
echo "#########################################################################"
echo ""
if [[ $docker_command == *"docker"* ]]; then
  echo ">> Docker is installed"
else
  echo "Installing docker ..."
  apt-get install docker -y
fi
if [ ! -f $gitconfig_file ]; then
    echo ""
    echo "#########################################################################"
    echo "####                   CHECKING .GITCONFIG FILE                      ####"
    echo "#########################################################################"
    echo ""
    echo "Please, make a copy of file '.gitconfig.template' and rename to '.gitconfig' and fill the .gitconfig file '[user]' section with your Github account info"
    echo "Username Found: $(git config --get user.name)"
    echo "Email Found: $(git config --get user.email)"
    exit -1;
fi
cd $git_folder && git config --local include.path ../.gitconfig && cd ..
if [ ! -f $npmrc_file ]; then
    echo ""
    echo "#########################################################################"
    echo "####                    CHECKING .NPMRC FILE                         ####"
    echo "#########################################################################"
    echo ""
    echo "Please, make a copy of file '.npmrc.template' and rename to '.npmrc' and fill the .npmrc file '_auth' and 'email' fields with your npm registry info"
    exit -1;
fi
echo ""
echo "#########################################################################"
echo "####                  CHECKING DOCKER IMAGE EXISTS                   ####"
echo "#########################################################################"
echo ""
if [[ "$(docker images ${image_name} | grep ${image_name} 2> /dev/null)" != "" ]]; then
  echo ">> Docker '${image_name}' image exists"
else
  docker build -t uif-lib-template --force-rm .
fi
exit 0
