const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../db/schemas/usersSchema.js");
const { NotAuthorizedError } = require("../helpers/errors.js");
const { SECRET_KEY } = process.env;

const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new NotAuthorizedError("Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(new NotAuthorizedError("Not authorized"));
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      next(new NotAuthorizedError("Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authValidation };
