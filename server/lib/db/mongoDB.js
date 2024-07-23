const mongoose = require("mongoose");
const { mongoUri } = require("../config");

exports.connection = async () => {
  // if mongoUri configuration missing throw error.
  if (!mongoUri) {
    throw new Error("missing mongoUri configuration");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("😊✨ server is Connected to the database! ✨😊");
  } catch (error) {
    console.log(error, "error from mongoDB connection");
  }
};
