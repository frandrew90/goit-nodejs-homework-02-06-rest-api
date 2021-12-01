const User = require("../db/schemas/usersSchema");
// const bcrypt = require("bcryptjs");
// const { NotAuthorizedError } = require("../helpers/errors");

const createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

const loginUser = async (_id, token) => {
  const user = await User.findByIdAndUpdate(_id, { token });
  return user;
};

const logoutUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { token: null });
};

const getCurrentUser = async (_id) => {
  const user = await User.findById(_id);
  return user;
};

module.exports = { createUser, loginUser, logoutUser, getCurrentUser };
