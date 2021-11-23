/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */

const app = require("../app");
const mongoose = require("mongoose");

// const PORT = process.env.PORT || 3000;
const { PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(" Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
