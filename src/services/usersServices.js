const User = require("../db/schemas/usersSchema");

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

const updateAvatar = async (_id, avatar) => {
  const { avatarURL } = await User.findByIdAndUpdate(_id, {
    avatarURL: avatar,
  });
  return avatarURL;
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
};
