const Model = require("./Model.js")
class Vote extends Model {
    static get tableName() {
        return "votes"
    }
    static getjsonSchema() {
        return {
            type: "object",
            required: ['score'],
            properties: {
                upVote: { type: ["integer", "string"] },
                downVote: { type: ["integer", "string"] },
                score: { type: ["integer", "string"] },
                parkId: { type: ["integer", "string"] },
                userId: { type: ["integer", "string"] }
            }
        }
    }
    static get relationMappings() {
        const Park = require("./Park.js")
        const User = require("./User.js")
        return {
            Park: {
                relation: Model.BelongsToOneRelation,
                modelClass: Park,
                join: {
                    from: "votes.parkId",
                    to: "park.id",
                }
            },
            User: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "votes.userId",
                    to: "users.id"
                }
            }
        }
    }
}
module.exports = Vote