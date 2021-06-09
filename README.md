# Set up Postgres by docker:

1. `docker pull postgres` get Postgres image
2. `docker-compose up` run a container
3. `docker ps -a` get container id
4. `docker-compose run containerid bash` run a bash shell in the container
5. `psql --host postgres --username xinxin --dbname=collection` connect to collection database

- The running port for backend is **5000**.
- Postgres is listening on port **5432**.
- Please run `npm init -y` and `npm install` to set up the project.
- **records.sql** provides 10 records for **products** table.
- To run test script, please **manually** change `NODE_ENV` in /.env file from `dev` to `test`, since cross-env does not work at the moment.
- Actually **.env** should be ignored as well, but for the review, I will keep it available at the moment.

# npm scripts

- `npm run start` to run the project
- `npm run build` to complie TypeScript to JavaScript
- `npm run test` to run Spec (please run `npm run build` and change `NODE_ENV` to be `test` first)
- `npm run lint-and-fix` to format scripts
