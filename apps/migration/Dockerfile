# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf


# ------------------------------------------------------
# Install dependencies and build application
# ------------------------------------------------------
FROM node:16.3.0

WORKDIR /usr/src/migration
COPY ./dist/apps/migration .
COPY ./shell/wait-for-it.sh wait-for-it.sh

RUN yarn install --production

CMD ["yarn", "knex", "migrate:latest"]
