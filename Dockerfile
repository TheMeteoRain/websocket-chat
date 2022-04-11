# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

# ------------------------------------------------------
# Base image of the application
# ------------------------------------------------------
FROM node:16.14.2-alpine3.15

RUN [ "apk", "--no-cache", "--update", "add", "dumb-init", "bash" ]
USER node
WORKDIR /usr/src
COPY --chown=node:node . .
RUN yarn install --immutable --immutable-cache --check-cache
#ENV NODE_ENV production

CMD yarn nx serve