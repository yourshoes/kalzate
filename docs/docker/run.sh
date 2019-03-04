#!/usr/bin/env bash
docker_command=$(command -v docker)
container_name="uif"
# if [[ $docker_command != "docker" ]]; then
./scripts/docker/linux/setup.sh;
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
# fi
echo ""
echo "#########################################################################"
echo "####              CHECKING DOCKER CONTAINER EXISTS                   ####"
echo "#########################################################################"
echo ""
if [ ! "$(docker ps -q -f status=exited -f name=$container_name)" ]; then
  echo ">> Creating Docker Container"
  # run your container and attach
  docker run -d --name uif --volume $(pwd):/usr/src --volume /usr/src/node_modules -it uif-lib-template /bin/bash
  echo ">> Attaching to container (Press enter)"
  docker attach uif
else
  echo ">> Starting Docker Container"
  docker start uif
  echo ">> Attaching to container (Press enter)"
  docker attach uif
fi
exit 0;
