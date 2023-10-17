# Websocket-chat

I hope future me will write something here :)

## Development

    pgcli -h 127.0.0.1 -p 6543 -u chat_user -d chat

    brew install asdf
    asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
    asdf plugin-add pnpm
    asdf install



    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up chat-database chat-database-migrate

    docker exec -it websocket-chat-chat-proxy-1 nginx -s reload
    docker exec -it websocket-chat-chat-proxy-1 vim /etc/nginx/conf.d/default.conf

### Docker

Purge all things related to project's docker-compose

    docker-compose down -v --rmi all --remove-orphans
