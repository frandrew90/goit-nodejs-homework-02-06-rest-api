const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { contactsRouter } = require("./src/routes/api/contactsRouter");
const { usersRouter } = require("./src/routes/api/usersRouter");
const { errorHandler } = require("./src/helpers/apiHelpers.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
