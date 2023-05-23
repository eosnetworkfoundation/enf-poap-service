#!/usr/bin/env bash

## This script runs in the context of the container.

set -euxo pipefail

echo "Applying migrations..."
source .env
npx prisma generate
npx prisma migrate deploy
echo "Done."

exec "$@"

