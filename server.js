const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', api);

app.listen(port, () => {
  console.log(`server start # ${port}`);
});