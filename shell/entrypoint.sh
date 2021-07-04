#!/usr/bin/env bash
cd migration
yarn knex migrate:rollback
yarn knex migrate:latest
cd ../server
node main.js
