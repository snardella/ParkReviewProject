/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
    fields: ["email"],
    identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings(){
    const {Vote, Review, Park} = require("./index")
    
    return {
      parks: {
        relation: Model.ManyToManyRelation,
        modelClass: Park,
        join: {
          from: "users.id",
          through: {
            from: "reviews.userId",
            to: "reviews.parkId",
          },
          to: "parks.id",
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "users.id",
          to: "reviews.userId",
        }
      },
      parks: {
        relation: Model.ManyToManyRelation,
        modelClass: Park,
        join: {
            from: "users.id",
            through: {
                from: "votes.userId",
                to: "votes.parkId"
            },
            to: "parks.id"
          }
        },
        votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
            from: "users.id",
            to: "votes.userId"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }
      return serializedJson;
  }
}

module.exports = User;