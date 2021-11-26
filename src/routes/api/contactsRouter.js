/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

const express = require("express");
const router = new express.Router();
const { contactsValidation } = require("../../middlewares/validation.js");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  UpdateContact,
  updateContactStatus,
} = require("../../controllers/contactsController.js");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", contactsValidation, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactsValidation, UpdateContact);

router.patch("/:contactId/favorite", contactsValidation, updateContactStatus);

module.exports = { contactsRouter: router };
