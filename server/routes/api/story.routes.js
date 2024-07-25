const {
  createStory,
  getAllStories,
  storyDetails,
  storyContribution,
  sendStory,
} = require("../../controllers/story.controller");
const { auth } = require("../../middleware/authentication");

module.exports = (app) => {
  app.get("/api/stories", auth, getAllStories);
  app.get("/api/story/:id", auth, storyDetails);
  app.post("/api/create-story", auth, createStory);
  app.post("/api/story/:id/content", auth, storyContribution);
  app.get("/api/story/share-story/:id", auth, sendStory);
};
