# ------------------------------------------------------
# Production image
# ------------------------------------------------------
FROM node:20.6.0-alpine3.18

ENV PNPM_VERSION 8.7.6
ENV NODE_ENV production

RUN apk --update-cache upgrade
# https://github.com/Yelp/dumb-init
# python3 make g++ required for apple silicon
RUN apk add dumb-init curl vim python3 make g++

# https://pnpm.io/installation
# https://klabsdev.com/posts/InstallPNPMAlpine/
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

USER node
WORKDIR /chat

COPY --chown=node:node ["./dist/apps/server/pnpm-lock.yaml", "./"]
RUN pnpm fetch
COPY --chown=node:node ["./dist/apps/server", "./"]
RUN pnpm install --frozen-lockfile --offline

EXPOSE 4300/tcp

# Let dumb-init handle being PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["sh", "-c", "node main.js"]