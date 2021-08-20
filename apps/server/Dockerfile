# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

# ------------------------------------------------------
# Install dependencies and build application
# ------------------------------------------------------
FROM node:16.3.0-alpine3.12

RUN ["apk", "add", "--update", "bash"]

WORKDIR /usr/src

COPY ["./dist/apps/server/package.json", "./server/"]
RUN ["yarn", "--cwd", "server", "install", "--production"]

COPY ["./dist/apps/migration/package.json", "./migration/"]
RUN ["yarn", "--cwd", "migration", "install", "--production"]

COPY ["./dist/apps/server", "./server"]
COPY ["./dist/apps/migration", "./migration"]
COPY ["./shell/entrypoint.sh", "./entrypoint.sh"]
COPY ["./shell/wait-for-it.sh", "./wait-for-it.sh"]

ENTRYPOINT [ "./entrypoint.sh" ]
