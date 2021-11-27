/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

const contactSchema = require("../db/schemas/contactsSchema.js");

const listContacts = async () => {
  const contacts = await contactSchema.find({});
  return contacts;
};

const contactFinderById = async (contactId) => {
  const contactById = await contactSchema.findById(contactId);
  return contactById;
};

const contactRemover = async (contactId) => {
  const removedContact = await contactSchema.findByIdAndRemove(contactId);
  return removedContact;
};

const contactAdder = async (body) => {
  const newContact = await contactSchema.create(body);
  return newContact;
};

const contactUpdater = async (contactId, body) => {
  const contactForUpdate = await contactSchema.findByIdAndUpdate(
    contactId,
    body,
    {
      new: true,
    }
  );
  return contactForUpdate;
};

const contactStatusUpdater = async (contactId, body) => {
  const { favorite } = body;
  const contactForUpdate = await contactSchema.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  return contactForUpdate;
};

module.exports = {
  listContacts,
  contactFinderById,
  contactRemover,
  contactAdder,
  contactUpdater,
  contactStatusUpdater,
};
