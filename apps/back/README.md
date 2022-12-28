
# Dopamarket Backend

This repository contains the backend code for the dopamarket project. The application is built using the NestJS framework and TypeORM for database management. The database used is MySQL. The goal of this project is to provide a robust and efficient backend for the dopamarket platform.

## Features
- API endpoints for managing user accounts, products, and orders
- Integration with MySQL database using TypeORM
- Unit tests to ensure the correctness and reliability of the code

## Installation

```bash
$ npm install
```

- Set up the MySQL database and configure the database connection in the ormconfig.json file

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
