FROM node:19
RUN apt-get update -qq && apt-get install -y postgresql-client

WORKDIR /web
COPY package.json .
RUN yarn install
COPY prisma/schema.prisma prisma
RUN yarn run generate
COPY . /web
RUN yarn run build

# [PI-PORT] WIP: Uncomment this when you want to pass in a specific port.
# ARG port
# ENV PORT port 
# EXPOSE ${PORT}
EXPOSE 8080

# [PI-SGNL] WIP: We need to figure out how to pass signals in properly.
CMD [ "node", "-r", "dotenv/config", "prod-server.js"]
