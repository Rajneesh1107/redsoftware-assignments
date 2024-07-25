const {
  validatePassword,
  hashedPassword,
  comparePassword,
  generateAccessToken,
  validateObjectId,
} = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let isExistUser = await User.findOne({ email });

    //check User is already register or not
    if (isExistUser) {
      res.status(http.CONFLICT).send({
        msg: "error",
        error: `User with the email ${email} already registered.`,
      });
      return;
    }

    // password validator
    let isPasswordValidate = validatePassword(password);

    //if password is not strong throw the error
    if (!isPasswordValidate) {
      res.status(http.BAD_REQUEST).send({
        msg: "Please create strong password",
        error:
          "Password must contain at least 8 characters, 1 capital letter, 1 small letter , 1 number, and 1 special character",
      });

      return;
    }

    // User details take it out from req.body
    let userDetails = { email, password, username };

    //Hashed the User password before saving database
    userDetails.password = hashedPassword(userDetails.password);

    //save the user details on mongoDB.
    const createUser = new User(userDetails);
    await createUser.save();

    //send the response to user after account is created.
    res.status(http.CREATED).send({
      msg: "Account created successfull",
      user_id: createUser._id,
    });
  } catch (error) {
    // Throw an error message
    res.status(http.BAD_REQUEST).send({ msg: "error from catch block", error });
  }
};

exports.login = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userDetails = await User.findOne({ $or: [{ email }, { username }] });

    // userDetails is null send response to user not registered

    if (!userDetails) {
      res.status(http.NOT_FOUND).send({
        msg: "error",
        error: "user not registered with the given email/username",
      });
      return;
    }

    // matched the given password is correct

    let passwordMatched = comparePassword(password, userDetails.password);

    //// if entered password is not matched throw a error message.
    if (!passwordMatched) {
      res.status(http.UNAUTHORIZED).send({
        msg: "error",
        error: "Please! enter correct password",
      });
      return;
    }

    const payload = {
      userId: userDetails.id,
      email: userDetails.email,
    };

    //generate the access token
    const accessToken = generateAccessToken(payload);

    // if accessToken is not generated throw a error message.
    if (!accessToken) {
      res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ msg: "error", error: "failed to generate accessToken" });
      return;
    }

    // send access token and userId to client
    res.status(http.OK).send({
      msg: "Login Success",
      user_id: userDetails._id,
      access_token: accessToken,
    });
  } catch (error) {
    // send error message
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "error", error });
  }
};

// get usersDetails

exports.userDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // validate user Id should be a mongoDB id.
    if (!id || !validateObjectId(id)) {
      // if user id is not valid send a message
      res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ msg: "error", error: "id is not valid " });
      return;
    }

    // find the user details by userId
    const user = await User.findOne({ _id: id }, { password: 0 });

    // if user is not found in the database
    if (!user) {
      res
        .status(http.NOT_FOUND)
        .send({ msg: "error", error: "user is not found" });
    }

    // send the user details to client
    res.status(http.OK).send({ msg: "success", user });
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: "error", error: error.message });
  }
};

exports.logout = async (req, res) => {};
