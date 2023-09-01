const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: String,
    occupation: String,
    description: String,
    quotes: String,
    movie: String, // one to many
  },
  {
    timestamps: true,
  }
);

module.exports = model("Character", characterSchema);
