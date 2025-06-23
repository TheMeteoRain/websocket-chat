# Rally

A Real-Time WebSocket Chat Application.

## Prerequisites

### [ASDF](https://asdf-vm.com/)

    brew install asdf
    asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
    asdf plugin-add pnpm
    asdf install

Required software versions are listed in [.tool-versions](./.tool-versions). That are automatically installed when prompting `asdf install`.

## Development

Start local database:

    docker compose -f docker-compose.yml -f docker-compose.local.yml up -d database

Run migrations:

    pnpm nx run migrate:migrate:up
    pnpm nx run migrate:migrate:down:all

Start server:

    pnpm nx run server:serve

Start client:

    pnpm nx run @rally/client:dev

Start dockerized environment:

    docker build -f Dockerfile -t rally-base .
    docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

## ✍️ Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This helps with readability, automated changelogs, and versioning.
