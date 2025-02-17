const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());



// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});


