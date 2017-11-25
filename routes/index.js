const express = require('express');
const project = require('./project');
const category = require('./category');

const router = express.Router();

router.use('/projects', project);
router.use('/categories', category);

module.exports = router;