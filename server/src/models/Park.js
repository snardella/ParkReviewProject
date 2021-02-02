const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    fields: ["name"],
    identifiers: ["id"]
})

class Park extends Model {
    static get tableName() {
        return "parks"
    }

    static get relationMappings() {
        const { Vote, User } = require("./index");

        return {
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
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "location", "rating"],
            name: { type: "string", minLength: 1, maxLength: 30 },
            location: { type: "string" },
            description: { type: "string" },
            rating: { type: ["string", "float"] },
            picture: { type: "string" }
        }
    }
}

module.exports = Park