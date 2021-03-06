// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from "objection";
import Knex from "knex";
import { Application } from "../declarations";

class Users extends Model {
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["password"],

      properties: {
        email: { type: ["string", "null"] },
        password: { type: "string" },

        googleId: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const Campaigns = require("./campaigns.model");
    const Players = require("./players.model");

    return {
      campaigns: {
        relation: Model.HasManyRelation,
        modelClass: Campaigns,
        join: {
          from: "users.id",
          to: "campaigns.user_id",
        },
      },
      players: {
        relation: Model.HasManyRelation,
        modelClass: Players,
        join: {
          from: "users.id",
          to: "players.user_id",
        },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default function (app: Application) {
  const db: Knex = app.get("knex");

  db.schema
    .hasTable("users")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("users", (table) => {
            table.increments("id");

            table.string("email").unique();
            table.string("password");

            table.string("googleId");

            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created users table")) // eslint-disable-line no-console
          .catch((e) => console.error("Error creating users table", e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating users table", e)); // eslint-disable-line no-console

  return Users;
}
