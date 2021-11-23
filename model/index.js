/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const contactsPath = path.join(__dirname, "./contacts.json");

const contactSchema = require("../schemas/contactsSchema.js");

const listContacts = async () => {
  try {
    const contacts = await contactSchema.find({});
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactById = await contactSchema.findById(contactId);
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await contactSchema.findByIdAndRemove(contactId);
    return removedContact;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await contactSchema.create(body);
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactForUpdate = await contactSchema.findByIdAndUpdate(
      contactId,
      body,
      {
        new: true,
      }
    );
    return contactForUpdate;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    const contactForUpdate = await contactSchema.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    return contactForUpdate;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
