# ------------------------------------------------------
# Production image
# ------------------------------------------------------
FROM nginx:1.25.2-alpine

RUN apk --no-cache --update add dumb-init vim

COPY ./apps/client/nginx.conf /etc/nginx/templates/default.conf.template
COPY ./dist/apps/client /usr/share/nginx/html
EXPOSE 80/tcp
EXPOSE 443/tcp

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
