// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from "objection";
import Knex from "knex";
import { Application } from "../declarations";

class Campaigns extends Model {
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return "campaigns";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "user_id"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        user_id: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const Users = require("./users.model");
    const Players = require("./players.model");
    const Characters = require("./characters.model");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "campaigns.user_id",
          to: "users.id",
        },
      },
      players: {
        relation: Model.HasManyRelation,
        modelClass: Players,
        join: {
          from: "players.campaign_id",
          to: "campaigns.id",
        },
      },
      characters: {
        relation: Model.HasManyRelation,
        modelClass: Characters,
        join: {
          from: "campaigns.id",
          to: "characters.campaign_id",
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
    .hasTable("campaigns")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("campaigns", (table) => {
            table.increments("id");
            table.string("text");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created campaigns table")) // eslint-disable-line no-console
          .catch((e) => console.error("Error creating campaigns table", e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating campaigns table", e)); // eslint-disable-line no-console

  return Campaigns;
}
