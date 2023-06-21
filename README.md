# enf-poap-service

Everything you need to create a POAP and share a claim link for others to claim it.

## Prerequesites

-   Install docker
-   Install yarn

## Set up

```sh
git clone <this repo> <directory>
cd <directory>
yarn install
yarn run generate
yarn run build
```

_Note:_ if you don't run the yarn commands above locally, you will see typescript errors for types provided by Prisma and Sveltekit.

### Create a .env file or use the default

You will need a .env file to define the ports, usernames, passwords, etc. You can create your own or use the default and modify as needed. To use the default, rename [default.env](./default.env) to .env.

### About docker

We have two docker containers. One hosts our postgreSQL DB the other hosts a containerized version of our repo.
The containerized version of our repo is a complete copy of what's in our repo and is useful for testing and will ultimately be how we deploy our app. However, development work can just happen directly on your local machine until you are ready to test.

### Running docker

_Note:_ Make sure that your .env file has DATABASE_HOST set to db when running these commands and the scripts in this section.

Run `docker-compose up --build` to build your DB and server images and run them as a container. The build defined in the [Dockerfile](./Dockerfile) will install node_modules, generate prisma types, and then build the web app before finally running the node server. If you make changes and want to test again, use Ctrl+C to shut down the containers and rerun `docker-compose up --build`.

### Seeding the container or applying new migrations

If it's your first time running the DB, if there are changes to the [prisma schema](./prisma/schema.prisma), or if there are [new migrations](./prisma/migrations/), then run the init script to reset the db, apply the migrations, and seed the db.

```sh
chmod +x ./scripts/init-db.sh
./scripts/init-db.sh
```

If you do not want to reset the db or seed it and only want to apply the latest migrations, you can run

```sh
chmod +x ./scripts/apply-latest-migrations.sh
./scripts/apply-latest-migrations.sh
```

_Note:_ The above command may not be able to preserve your database if the migrations have been reset. This should only be the case before we have gone to production as once we have gone to production we will need to ensure migrations are properly written to avoid loss of data.

At this point, your application should be up and running.

### Running locally

_Note:_ If what you are testing depends on the postgreSQL DB, make sure that the docker container for it is running.
If you want to just run the app as an ordinary Svelte app, you can just run

```sh
yarn run dev
```

(Other commands can be found in package.json)
If you want to run the full prod server (which includes other non-Svelte routes), you can do that by running

```sh
node prod-server.js
```

You may get an error that a port is already in use if your Docker Container is also running. You can either shut down the container or change the port to something else in the prod-server.js file.

## Backend API

The API for storing images and tokens is documented in [api.yaml](./docs/api.yaml) this can be pasted into https://editor-next.swagger.io/ to view the API information in a nicer format. You can also install an extension for OpenAPI to generate this preview in your IDE.

## Reference
- [Image Uploads](docs/cloudinary.md): Notes On Cloudinary Setup