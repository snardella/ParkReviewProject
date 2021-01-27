const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get relationMappings(){
    const Park = require("./Park.js")
    const User = require("./User.js")
    return {
      park: {
        relation: Model.BelongsToOneRelation,
        modelClass: Park,
        join: {
          from: "reviews.parkId",
          to: "park.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rating", "comments"],
      properties: {
        rating: {type:"string", minLength: 1, maxLength: 255},
        comments: { type: "string", minLength: 1, maxLength: 255 },
      }
    }
  }
}

module.exports = Task