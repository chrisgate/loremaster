// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://postgres:password@localhost:5432/loremaster",
    migrations: {
      directory: __dirname + "/knex/development/migrations",
    },
    seeds: {
      directory: __dirname + "/knex/development/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
