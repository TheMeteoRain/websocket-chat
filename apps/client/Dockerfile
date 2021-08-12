# Follow good practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
# https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

# ------------------------------------------------------
# Install dependencies and build application
# ------------------------------------------------------
FROM nginx:1.21.0-alpine

COPY ./dist/apps/client /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
