const express = require('express');
const test = require('./test');
const project = require('./project');

const router = express.Router();

router.use('/projects', project);

module.exports = router;