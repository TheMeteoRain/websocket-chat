# ------------------------------------------------------
# Production image
# ------------------------------------------------------
FROM node:16.14.2-alpine3.15

USER node
ENV NODE_ENV production
WORKDIR /usr/apps
COPY ["./dist/apps/server", "./server"]
COPY ["./dist/apps/migration", "./migration"]
COPY ["./shell/entrypoint.sh", "./entrypoint.sh"]
COPY ["./shell/wait-for-it.sh", "./wait-for-it.sh"]
RUN ["yarn", "--cwd", "migration", "install", "--production"]
RUN ["yarn", "--cwd", "server", "install", "--production"]

ENTRYPOINT [ "./entrypoint.sh" ]