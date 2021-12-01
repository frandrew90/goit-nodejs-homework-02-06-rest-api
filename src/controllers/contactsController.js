const {
  listContacts,
  contactFinderById,
  contactRemover,
  contactAdder,
  contactUpdater,
  contactStatusUpdater,
} = require("../services/contactServices.js");

const { WrongParametersError } = require("../helpers/errors");

const getContactsController = async (req, res) => {
  const data = await listContacts();
  res.json({ status: "success", code: 200, data });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactFinderById(contactId);
  if (!data) {
    throw new WrongParametersError(`There is no contact with id: ${contactId}`);
  }
  res.json({
    status: "success",
    code: 200,
    data,
  });
};

const addContactController = async (req, res) => {
  const data = await contactAdder(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactRemover(contactId);
  if (!data) {
    throw new WrongParametersError(`There is no contact with id: ${contactId}`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `The contact with id: ${contactId} successfuly removed`,
    data,
  });
};

const UpdateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const data = await contactUpdater(contactId, req.body);
  if (!name ?? !email ?? !phone) {
    throw new WrongParametersError("Please enter a correct values");
  }
  if (!data) {
    throw new WrongParametersError(`There is no contact with id: ${contactId}`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data,
  });
};

const updateContactStatusController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactStatusUpdater(contactId, req.body);
  if (!data) {
    throw new WrongParametersError(`There is no contact with id: ${contactId}`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: data,
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  UpdateContactController,
  updateContactStatusController,
};
