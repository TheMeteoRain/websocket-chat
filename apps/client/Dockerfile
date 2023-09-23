# ------------------------------------------------------
# Production image
# ------------------------------------------------------
FROM nginx:1.25.2-alpine

RUN apk --no-cache --update add dumb-init

COPY ./nginx.conf /etc/nginx/templates/default.conf.template
COPY ./dist/apps/client /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
