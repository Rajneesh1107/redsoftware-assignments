const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please! Enter story Title"] },
    contributions: [contributionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Story = mongoose.model("story", storySchema);
module.exports = Story;

// Story Model:
// Fields: id, title, contributions (array of objects with userId and content),
// createdBy
