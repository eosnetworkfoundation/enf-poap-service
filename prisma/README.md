## Useful CLI commands

To use these commands outside of Docker, make sure that your `DATABASE_HOST` environment variable is set to "localhost", not "db" and make sure the Docker container is running.

```sh
# Generate a migration based on the schema
prisma migrate dev --name NameOfMigration

 # Open a browser to view the DB
prisma studio

# Update the PrismaClient and types to what's in the schema.prisma
prisma generate

# Seed the db based on what's in seed.ts. This command actually just runs whatever is in the prisma.seed key of the package.json
prisma db seed
```

NOTE: you will need to have prisma installed globally for these commands to work, or you can use npx, for example

```sh
npx prisma studio
```

npx should already be installed as it comes with recent npm versions.
