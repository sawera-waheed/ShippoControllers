const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./router"));
app.use(express.json());
app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
