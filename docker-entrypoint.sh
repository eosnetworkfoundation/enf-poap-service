#!/usr/bin/env bash

set -euxo pipefail

if [ ! -f .initialized ]; then
    echo "Seeding container..."
    source .env
    PGPASSWORD=$POSTGRES_PASSWORD psql -h $DATABASE_HOST -U $POSTGRES_USERNAME < ./seed.sql
    npx prisma db pull
    npx prisma generate
    touch .initialized
    echo "Done."
fi

exec "$@"
