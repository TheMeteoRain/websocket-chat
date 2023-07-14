#!/usr/bin/env bash
yarn --cwd migration knex migrate:rollback
yarn --cwd migration knex migrate:latest
cd server
node main.js
