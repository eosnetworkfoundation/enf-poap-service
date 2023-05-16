#!/usr/bin/env bash

docker exec -i $(docker ps | cut -d' ' -f1 | sed -n '2p') bash < ./scripts/seed-database.sh
