/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      // eslint-disable-next-line comma-dangle
      (contact) => contact.id.toString() === contactId
    );
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(
      // eslint-disable-next-line comma-dangle
      (contact) => contact.id.toString() !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
    return newContactList;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = uuidv4();
    const newContact = {
      id,
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactByID = await getContactById(contactId);
    if (!contactByID) {
      console.log(`There is no contact with id: ${contactId}`);
      return;
    }
    const updatedContact = {
      contactId,
      ...body,
    };
    const contacts = await listContacts();
    const newContactList = contacts.filter(
      // eslint-disable-next-line comma-dangle
      (contact) => contact.id.toString() !== contactId.toString()
    );
    newContactList.push(updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
    return updatedContact;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
