const express = require("express");
const router = new express.Router();
const { contactsValidation } = require("../../middlewares/validation.js");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  UpdateContact,
  updateContactStatus,
} = require("../../controllers/contactsController.js");

router.get("/", asyncWrapper(getContacts));
router.get("/:contactId", asyncWrapper(getContactById));
router.post("/", contactsValidation, asyncWrapper(addContact));
router.delete("/:contactId", asyncWrapper(deleteContact));
router.put("/:contactId", contactsValidation, asyncWrapper(UpdateContact));

router.patch(
  "/:contactId/favorite",
  contactsValidation,
  asyncWrapper(updateContactStatus)
);

module.exports = { contactsRouter: router };
