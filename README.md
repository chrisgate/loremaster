# loremaster

## Seed Command
Running `npm run seed` will create a user via HTTP in feathers and then will run `knex seed` to set up the rest of the data.

## Database Docker Compose file
```
version: "3.5"

services:
  postgres:
    container_name: postgres_container
    image: postgres:12-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password}
      PGDATA: /data/postgres
    volumes:
      - postgres:/data/postgres
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres:
```
