## Useful commands
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