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

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "location"],
      name: {type: "string", minLength: 1, maxLength: 30},
      location: {type: "string"},
      description: {type: "string"},
      picture: {type: "string"}
    }
  }
}

module.exports = Park 