const Model = require("./Model");
const uniqueFactory = require("objection-unique");

const unique = uniqueFactory({
    fields: ["name"],
    identifiers: ["id"],
});

class Park extends unique(Model) {
      static get tableName() {
          return "parks";
      }
      static get relationMappings() {
        const {Review, User, Vote} = require("./index")
          return {
              reviews: {
                  relation: Model.HasManyRelation,
                  modelClass: Review,
                  join: {
                      from: "parks.id",
                      to: "reviews.parkId",
                  },
              },
              user: {
                  relation: Model.BelongsToOneRelation,
                  modelClass: User,
                  join: {
                      from: "parks.userId",
                      to: "users.id",
                  },
              },
              users: {
                  relation: Model.ManyToManyRelation,
                  modelClass: User,
                  join: {
                      from: "parks.id",
                      through: {
                          from: "votes.parkId",
                          to: "votes.userId"
                      },
                      to: "users.id"
                  }
              },
              votes: {
                  relation: Model.HasManyRelation,
                  modelClass: Vote,
                  join: {
                      from: "parks.id",
                      to: "votes.parkId"
                  }
              }
          };
      }
      static get jsonSchema() {
          return {
              type: "object",
              required: ["name", "location", "rating"],
              name: { type: "string", minLength: 1, maxLength: 30},
              location: { type: "string" },
              description: { type: "string" },
              rating: { type: ["string", "float"] },
              picture: { type: "string" },
              };
          }
}

module.exports = Park;