const express = require("express");
const router = new express.Router();
const { contactsValidation } = require("../../middlewares/validation.js");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  UpdateContactController,
  updateContactStatusController,
} = require("../../controllers/contactsController.js");

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", contactsValidation, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
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
