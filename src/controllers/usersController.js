const {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../services/usersServices");

const User = require("../db/schemas/usersSchema");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { NotAuthorizedError, ConflictError } = require("../helpers/errors");

const createUserController = async (req, res) => {
  const { email, password } = req.body;
  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    throw new ConflictError(`Email:${email} in use`);
  }

  const user = new User({ email });
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

module.exports = {
  createUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
};
