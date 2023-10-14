# ------------------------------------------------------
# Base image for local development
# ------------------------------------------------------
FROM node:20.6.0-alpine3.18

ARG PNPM_VERSION 8.7.6
ENV NODE_ENV development

RUN apk --update-cache upgrade
# https://github.com/Yelp/dumb-init
# python3 make g++ required for apple silicon
RUN apk add dumb-init curl vim python3 make g++

# https://pnpm.io/installation
# https://klabsdev.com/posts/InstallPNPMAlpine/
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

USER node
WORKDIR /chat

COPY --chown=node:node ./pnpm-lock.yaml .
RUN pnpm fetch
COPY --chown=node:node . .
RUN pnpm install --offline

# dist folder is not in .dockerignore
# because production image must be able to read from dist
# delete dist from development image manually
RUN rm -rf dist

# Let dumb-init handle being PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]