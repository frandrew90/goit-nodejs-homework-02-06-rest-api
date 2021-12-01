const express = require("express");
const router = new express.Router();
const { contactsValidation } = require("../../middlewares/validation.js");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const { authValidation } = require("../../middlewares/authValidation.js");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  UpdateContactController,
  updateContactStatusController,
} = require("../../controllers/contactsController.js");

router.get("/", authValidation, asyncWrapper(getContactsController));
router.get(
  "/:contactId",
  authValidation,
  asyncWrapper(getContactByIdController)
);
router.post(
  "/",
  authValidation,
  contactsValidation,
  asyncWrapper(addContactController)
);
router.delete(
  "/:contactId",
  authValidation,
  asyncWrapper(deleteContactController)
);
router.put(
  "/:contactId",
  contactsValidation,
  asyncWrapper(UpdateContactController)
);

router.patch(
  "/:contactId/favorite",
  contactsValidation,
  asyncWrapper(updateContactStatusController)
);

module.exports = { contactsRouter: router };
