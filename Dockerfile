# ------------------------------------------------------
# Base image for local development
# ------------------------------------------------------
FROM node:20.6.0

ARG PNPM_VERSION 8.7.6
ENV NODE_ENV development

RUN apt update && apt upgrade -y
# https://github.com/Yelp/dumb-init
RUN apt install dumb-init

# https://pnpm.io/installation
# https://klabsdev.com/posts/InstallPNPMAlpine/
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

USER node
WORKDIR /app

# https://github.com/nrwl/nx/issues/15380#issuecomment-1460652743
# add extra package for alpine compatibility
RUN pnpm add @nrwl/nx-linux-x64-gnu @nrwl/nx-linux-x64-musl @nx/nx-darwin-arm64
COPY --chown=node:node ./pnpm-lock.yaml .
RUN pnpm fetch
COPY --chown=node:node . .
RUN pnpm install -r -offline

# dist folder is not in .dockerignore
# because production image must be able to read from dist
# delete dist from development image manually
RUN rm -rf dist

# Let dumb-init handle being PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]