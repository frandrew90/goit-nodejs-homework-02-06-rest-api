/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

const express = require("express");
const router = new express.Router();
const { contactsValidation } = require("../../middlewares/validation.js");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../../model/index.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({ status: "success", code: 200, data });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await getContactById(contactId);
    if (!data) {
      const error = new Error(`There is no contact with id: ${contactId}`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", contactsValidation, async (req, res, next) => {
  try {
    const data = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId);
    if (!data) {
      const error = new Error(`There is no contact with id: ${contactId}`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: `The contact with id: ${contactId} successfuly removed`,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", contactsValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const data = await updateContact(contactId, req.body);
    if (!name ?? !email ?? !phone) {
      const error = new Error("Please enter a correct values");
      error.status = 400;
      throw error;
    }
    if (!data) {
      const error = new Error(`There is no contact with id: ${contactId}`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  contactsValidation,
  async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const data = await updateStatusContact(contactId, req.body);
      if (!data) {
        const error = new Error(`There is no contact with id: ${contactId}`);
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        status: "success",
        code: 200,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { contactsRouter: router };
