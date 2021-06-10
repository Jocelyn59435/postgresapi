## Project Summary

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

## Set up Postgres by docker:

1. `docker pull postgres` get Postgres image
2. `docker-compose up` run a container
3. `docker ps -a` get container id
4. `docker-compose run containerid bash` run a bash shell in the container
5. `psql --host postgres --username xinxin --dbname=collection` connect to collection database
6. `db-migrate up` to migrate four tables
   `db-migrate down` to delete four tables

- The running port for backend is **5000**.
- Postgres is listening on port **5432**.
- Please run `npm init -y` and `npm install` to set up the project.
- **records.sql** provides 10 records for **products** table.
- To run test script, please **manually** change `NODE_ENV` in /.env file from `dev` to `test`, since cross-env does not work at the moment.
- Actually **.env** should be ignored as well, but for the review, I will keep it available at the moment.

## npm scripts

- `npm run start` to run the project
- `npm run build` to complie TypeScript to JavaScript
- `npm run test` to run Spec (please run `npm run build` and change `NODE_ENV` to be `test` first)
- `npm run lint-and-fix` to format scripts

API endpoints and data shapes can be found in REQUIREMENTS.md
