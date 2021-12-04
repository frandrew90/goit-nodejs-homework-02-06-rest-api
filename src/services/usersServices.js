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

const verificationUser = async (_id) => {
  await User.findByIdAndUpdate(_id, {
    verifyToken: null,
    verify: true,
  });
};

const reVerificationUser = async (email) => {
  const { verifyToken } = await User.findOne({ email });
  // console.log(verifyToken);
  return verifyToken;
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  verificationUser,
  reVerificationUser,
};
