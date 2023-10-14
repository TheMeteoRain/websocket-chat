# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf


# ------------------------------------------------------
# Install dependencies and build application
# ------------------------------------------------------
FROM node:20.6.0-alpine3.18

WORKDIR /usr/src/migration
COPY ./dist/apps/migration .

RUN yarn install --production

CMD ["yarn", "knex", "migrate:latest"]