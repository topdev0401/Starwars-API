const express = require("express");
const { API_PORT } = require("./utils/config")

const app = express();

const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
