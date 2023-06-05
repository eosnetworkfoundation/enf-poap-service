#!/usr/bin/env bash

## This script runs in the context of the container.

set -euxo pipefail

echo "Dropping data and re-seeding container..."
source .env
npx prisma migrate reset --force
echo "Done."

exec "$@"

