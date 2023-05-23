# enf-poap-service

Everything you need to create a POAP and share a claim link for others to claim it.

## Set up
```sh
git clone <this repo> <directory>
cd <directory>
```

```sh
docker-compose down -v # if needed
docker-compose up # or docker-compose up --build if you modified the Dockerfile
```

Once you see both containers up and ready, you can reset, apply the latest migrations, and seed the DB using
```sh
chmod +x ./scripts/seed-db-container.sh
./scripts/seed-db-container.sh
```

If you do not want to reset the db or seed it and only want to apply the latest migrations, you can run
```sh
chmod +x ./scripts/apply-latest-migrations.sh
./scripts/apply-latest-migrations.sh
```

At this point, your application should be up and running.

## Backend API
The API for storing images and tokens is documented in [api.yaml](./docs/api.yaml) this can be pasted into https://editor-next.swagger.io/ to view the API information in a nicer format. You can also install an extension for OpenAPI to generate this preview in your IDE.
