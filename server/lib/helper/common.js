const bcrypt = require("bcrypt");
const { saltRound, accessKey } = require("../config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//password validation fucntion
exports.validatePassword = (password) => {
  //check password length is getter than 8
  if (password.trim().length < 8) {
    return false;
  }

  // check password contain at least one uppercase character
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // check password contain  at least one lowercase character

  if (!/[a-z]/.test(password)) {
    return false;
  }

  // check password contain at least one numeric value
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // check password contain at least one special character
  if (!/[!@#$%^&*_+=-]/.test(password)) {
    return false;
  }

  `if password length is greater than or equal to 8 and 
   password contain upperCase,lowerCase, numeric and special characters then  
   return true;
  `;
  return true;
};

//hashed the password while register a new user before saving to user details on database //
exports.hashedPassword = (mainPassword) => {
  const hashedPassword = bcrypt.hashSync(mainPassword, +saltRound);

  return hashedPassword;
};

// compare the password while loggin

exports.comparePassword = (mainPassword, hashedPassword) => {
  const isPasswordMatched = bcrypt.compareSync(mainPassword, hashedPassword);

  return isPasswordMatched;
};

// generate access token

exports.generateAccessToken = (payload) => {
  const options = { expiresIn: "1d" };

  const token = jwt.sign(payload, accessKey, options);

  return token;
};

//verify jwt token

exports.verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, accessKey);
    return decoded;
  } catch (error) {
    return false;
  }
};

// Function to validate ObjectId
exports.validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
