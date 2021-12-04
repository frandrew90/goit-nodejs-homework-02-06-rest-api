const express = require("express");
const router = new express.Router();
const {
  userValidation,
  verifyValidation,
} = require("../../middlewares/validation.js");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const { authValidation } = require("../../middlewares/authValidation.js");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateAvatarController,
  verificationUserController,
  reVerificationUserController,
} = require("../../controllers/usersController.js");

const upload = require("../../middlewares/upload.js");

router.post("/signup", userValidation, asyncWrapper(createUserController));
router.post("/login", userValidation, asyncWrapper(loginUserController));
router.post("/logout", authValidation, asyncWrapper(logoutUserController));
router.get("/current", authValidation, asyncWrapper(getCurrentUserController));
router.patch(
  "/avatars",
  upload.single("avatar"),
  authValidation,
  asyncWrapper(updateAvatarController)
);
router.get(
  "/verify/:verificationToken",
  asyncWrapper(verificationUserController)
);
router.post(
  "/verify",
  verifyValidation,
  asyncWrapper(reVerificationUserController)
);

module.exports = { usersRouter: router };
