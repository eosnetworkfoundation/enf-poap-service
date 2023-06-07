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
yarn run build
```

### Create a .env file or use the default

You will need a .env file to define the ports, usernames, passwords, etc. You can create your own or use the default and modify as needed. To use the default, rename [default.env](./default.env) to .env.

### Running docker

We have two docker containers. One hosts our postgreSQL DB the other hosts a containerized version of our repo.
The containerized version of our repo is a complete copy of what's in our repo and is useful for testing and will ultimately be how we deploy our app. However, development work can just happen directly on your local machine until you are ready to test.

_Note:_ Make sure that your .env file has DATABASE_HOST set to db when running these commands and the scripts in the next section.

```sh
docker-compose down -v # down shuts down the containers, -v also wipes data from the db
docker-compose up # or docker-compose up --build if you modified the Dockerfile
```

docker-compose up runs the [Dockerfile](./Dockerfile) which copies the repo, runs some setup commands (notably yarn install and yarn build) and then runs the app on the port you indicate on your env file.

### Seeding the container or applying new migrations

Once you see both containers up and ready, you can reset, apply the latest migrations, and seed the DB using

```sh
chmod +x ./scripts/init-db.sh
./scripts/init-db.sh
```

That command is most often what you'll want to do when pulling in changes which include modifications to the prisma models.

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
