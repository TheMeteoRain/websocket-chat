# Websocket-chat

I hope future me will write something here :)

## Prerequisites

### [ASDF](https://asdf-vm.com/)

    brew install asdf
    asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
    asdf plugin-add pnpm
    asdf install

Required software versions are listed in [.tool-versions](./.tool-versions). That are automatically installed when prompting `asdf install`.

## Development

### Database

Run database in docker

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up chat-database -d

Run database migration

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up chat-database-migrate

Run both

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up chat-database chat-database-migrate -d

Connect to database

    pgcli -h 127.0.0.1 -p 6543 -u chat_user -d chat

### Docker only

Setup

    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

Config nginx in docker

    docker exec -it websocket-chat-chat-proxy-1 vim /etc/nginx/conf.d/default.conf
    docker exec -it websocket-chat-chat-proxy-1 nginx -s reload

Purge all things related to project's docker-compose

    docker-compose down -v --rmi all --remove-orphans

### Basic commands

Start (runs client and server, requires that database is already running)

    pnpm start

Apply latest database migrations

    knex:latest

Rollback all database migrations

    knex:rollback
