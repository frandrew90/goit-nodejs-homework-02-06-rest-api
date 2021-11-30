const {
  listContacts,
  contactFinderById,
  contactRemover,
  contactAdder,
  contactUpdater,
  contactStatusUpdater,
} = require("../services/contactServices.js");

const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (req, res) => {
  const data = await listContacts();
  res.json({ status: "success", code: 200, data });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactFinderById(contactId);
  if (!data) {
    const error = new WrongParametersError(
      `There is no contact with id: ${contactId}`
    );
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const addContact = async (req, res) => {
  const data = await contactAdder(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactRemover(contactId);
  if (!data) {
    const error = new WrongParametersError(
      `There is no contact with id: ${contactId}`
    );
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: `The contact with id: ${contactId} successfuly removed`,
    data,
  });
};

const UpdateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const data = await contactUpdater(contactId, req.body);
  if (!name ?? !email ?? !phone) {
    const error = new Error("Please enter a correct values");
    error.status = 400;
    throw error;
  }
  if (!data) {
    const error = new WrongParametersError(
      `There is no contact with id: ${contactId}`
    );
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data,
  });
};

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactStatusUpdater(contactId, req.body);
  if (!data) {
    const error = new WrongParametersError(
      `There is no contact with id: ${contactId}`
    );
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: data,
  });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  UpdateContact,
  updateContactStatus,
};
