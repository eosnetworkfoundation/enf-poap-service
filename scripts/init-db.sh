#!/usr/bin/env bash

docker exec -i $(docker ps | cut -d' ' -f1 | sed -n '2p') bash < ./scripts/init-db-docker.sh
