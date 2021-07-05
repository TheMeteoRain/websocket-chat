# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

# ------------------------------------------------------
# Install dependencies and build application
# ------------------------------------------------------
FROM node:16.3.0 as builder

WORKDIR /usr/src
COPY ./dist/apps/client ./client

# ------------------------------------------------------
# Serve build
# ------------------------------------------------------
FROM nginx:1.21.0-alpine

COPY --from=builder /usr/src/client /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
