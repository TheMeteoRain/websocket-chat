# ------------------------------------------------------
# Production image
# ------------------------------------------------------
# This version is not working in raspberrypi
#FROM node:16.14.2-alpine3.15
FROM node:16.3.0-alpine3.12

RUN ["apk", "--update-cache", "upgrade"]
RUN ["apk", "add", "bash"]

USER node
ENV NODE_ENV production
WORKDIR /usr/apps
COPY --chown=node:node ["./dist/apps/server", "./server"]
COPY --chown=node:node ["./dist/apps/migration", "./migration"]
COPY --chown=node:node ["./shell/entrypoint.sh", "./entrypoint.sh"]
COPY --chown=node:node ["./shell/wait-for-it.sh", "./wait-for-it.sh"]
RUN ["yarn", "--cwd", "migration", "install"]
RUN ["yarn", "--cwd", "server", "install"]

ENTRYPOINT [ "./entrypoint.sh" ]