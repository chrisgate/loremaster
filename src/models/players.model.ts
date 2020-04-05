// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from "objection";
import Knex from "knex";
import { Application } from "../declarations";

class Players extends Model {
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return "players";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "user_id"],

      properties: {
        name: { type: "string" },
        class: { type: "string" },
        description: { type: "string" },
        user_id: { type: "integer" },
        campaign_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const Campaigns = require("./campaigns.model");
    const Users = require("./users.model");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "players.user_id",
          to: "users.id",
        },
      },
      campaigns: {
        relation: Model.BelongsToOneRelation,
        modelClass: Campaigns,
        join: {
          from: "players.campaign_id",
          to: "campaign.id",
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
    .hasTable("players")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("players", (table) => {
            table.increments("id");
            table.string("text");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created players table")) // eslint-disable-line no-console
          .catch((e) => console.error("Error creating players table", e)); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating players table", e)); // eslint-disable-line no-console

  return Players;
}
