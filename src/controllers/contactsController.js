/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

const {
  listContacts,
  contactFinderById,
  contactRemover,
  contactAdder,
  contactUpdater,
  contactStatusUpdater,
} = require("../../model/index.js");

const getContacts = async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json({ status: "success", code: 200, data });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactFinderById(contactId);
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
};

const addContact = async (req, res, next) => {
  try {
    const data = await contactAdder(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactRemover(contactId);
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
};

const UpdateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const data = await contactUpdater(contactId, req.body);
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
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactStatusUpdater(contactId, req.body);
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
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  UpdateContact,
  updateContactStatus,
};
