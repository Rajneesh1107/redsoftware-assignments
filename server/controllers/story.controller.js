const { validateObjectId } = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const Story = require("../models/story.model");

// Create a new story
exports.createStory = async (req, res) => {
  const { title, userDetails } = req.body;

  try {
    // Check if the title is provided
    if (!title) {
      res
        .status(http.BAD_REQUEST)
        .send({ msg: "error", error: "title is not found" });
      return;
    }

    // Check if userDetails are provided and user is logged in
    if (!userDetails || !userDetails.userId) {
      res
        .status(http.BAD_REQUEST)
        .send({ msg: "error", error: "please Login" });
      return;
    }

    // Create a new story object
    const story = {
      title,
      contributions: [],
      createdBy: userDetails.userId,
    };

    // Save the new story to the database
    const saveStory = new Story(story);
    await saveStory.save();

    // Send response to the client after story creation
    res.status(http.CREATED).send({ msg: "story created", story });
  } catch (error) {
    console.error(error.message);
    res
      .status(http.INTERNAL_SERVER_ERROR)
      .send({ msg: "error", error: error.message });
  }
};

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    // Retrieve all stories with story creator's username and email
    const allStories = await Story.find({}).populate("createdBy", [
      "username",
      "email",
    ]);
    console.log(allStories);
    res
      .status(http.OK)
      .send({ msg: "success", totalStories: allStories.length, allStories });
  } catch (error) {
    console.error(error.message);
    res
      .status(http.INTERNAL_SERVER_ERROR)
      .send({ msg: "error", error: error.message });
  }
};

// Get details of a specific story
exports.storyDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Check ID is mongoDB id
    if (!id || !validateObjectId(id)) {
      res
        .status(http.BAD_REQUEST)
        .send({ msg: "error", error: "id is not valid" });
      return;
    }

    // Retrieve story details with contributions' user details
    const story = await Story.findOne({ _id: id }).populate(
      "contributions.userId",
      ["username", "email"]
    );

    // check story found or not
    if (!story) {
      res
        .status(http.NOT_FOUND)
        .send({ msg: "error", error: "No Story found " });
      return;
    }
    res.status(http.OK).send({
      msg: "success",
      contributions: story.contributions.length,
      story,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(http.INTERNAL_SERVER_ERROR)
      .send({ msg: "error", error: error.message });
  }
};

// Add contribution to a story
exports.storyContribution = async (req, res) => {
  const { content, userDetails } = req.body;
  const { id } = req.params;

  try {
    // Check ID is mongoDB id
    if (!id || !validateObjectId(id)) {
      res
        .status(http.BAD_REQUEST)
        .send({ msg: "error", error: "id is not valid" });
      return;
    }

    // Retrieve the story by ID
    let story = await Story.findOne({ _id: id }).populate(
      "contributions.user",
      ["username"]
    );

    // Check if the story exists
    if (!story) {
      res
        .status(http.NOT_FOUND)
        .send({ msg: "error", error: "story doesn't exist" });
      return;
    }

    // Create a new contribution object
    let contribution = {
      user: userDetails.userId,
      content,
    };

    // Add the contribution to the story
    story.contributions.push(contribution);

    // Save the updated story to the database
    await story.save();

    // Send response to the client after adding the contribution
    res.status(http.CREATED).send({ msg: "success", story });
  } catch (error) {
    console.error(error.message);
    res
      .status(http.INTERNAL_SERVER_ERROR)
      .send({ msg: "error", error: error.message });
  }
};
