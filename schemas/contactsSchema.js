/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable comma-dangle */

const { Schema, model } = require("mongoose");

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);

const Contact = model("contact", contactsSchema);
module.exports = Contact;
