# ------------------------------------------------------
# Production image
# ------------------------------------------------------
FROM nginx:1.21.0-alpine

COPY ./dist/apps/client /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
