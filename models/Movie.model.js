const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title:{type: String, required: [true, "Movie title is required"]},
    genre: String,
    plot: String,
    imageUrl: {type: String, required: true},
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Character",
      },
    ],
  },
  {
    timestamps: true,
  }
);
movieSchema.index({ title: "text" });

module.exports = model("Movie", movieSchema);