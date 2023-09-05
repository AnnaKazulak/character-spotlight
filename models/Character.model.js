const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    description: String,
    quotes: String,
    movie: String, // one to many
    imageUrl: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

characterSchema.index({ name: "text" });
module.exports = model("Character", characterSchema);
