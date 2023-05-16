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
Once you see both containers up and ready, run from the repo directory root:
```sh
chmod +x ./scripts/seed-db-container.sh
./scripts/seed-db-container.sh
```

At this point, your application should be up and running.
