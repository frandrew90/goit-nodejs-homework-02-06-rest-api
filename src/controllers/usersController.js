const {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
} = require("../services/usersServices");

const User = require("../db/schemas/usersSchema");

const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

const { NotAuthorizedError, ConflictError } = require("../helpers/errors");

const fs = require("fs");

const path = require("path");

const jimp = require("jimp");

const createUserController = async (req, res) => {
  const { email, password } = req.body;
  const avatar = gravatar.url(email, { s: 200 }, false);
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new ConflictError(`Email:${email} in use`);
  }

  const user = new User({ email, avatarURL: avatar });
  user.setPassword(password);
  const data = await createUser(user);

  res.json({ status: "Created", code: 201, data });
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new NotAuthorizedError("Email or password is wrong");
  }
  const { _id } = user;
  const payload = { _id };
  const token = jwt.sign(payload, SECRET_KEY);
  await loginUser(_id, token);
  res.json({
    status: "OK",
    code: 200,
    data: {
      token,
      user: {
        email,
        password,
        _id,
      },
    },
  });
};

const logoutUserController = async (req, res) => {
  const { _id } = req.user;

  await logoutUser(_id);
  res.json({
    status: "No Content",
    code: 204,
    message: "success logout",
  });
};

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;

  const user = await getCurrentUser(_id);
  res.json({
    status: "OK",
    code: 200,
    data: { user },
  });
};

const updateAvatarController = async (req, res) => {
  const { _id } = req.user;
  const { path: UPLOAD_DIR, originalname } = req.file;
  const [fileExt] = originalname.split(".").reverse();
  const fileName = `${_id}.${fileExt}`;
  const DEST_DIR = path.join(__dirname, "../../", "public/avatars", fileName);
  if (!_id) {
    throw new NotAuthorizedError("Not authorized");
  }

  await jimp.read(UPLOAD_DIR).then((originalname) => {
    return originalname.resize(250, 250).write(UPLOAD_DIR);
  });
  await fs.rename(UPLOAD_DIR, DEST_DIR, () => {});
  const avatar = path.join("avatars", fileName);
  console.log(avatar);
  const data = await updateAvatar(_id, avatar);
  await res.json({
    status: "OK",
    code: 200,
    avatarURL: data,
  });
};

module.exports = {
  createUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateAvatarController,
};
