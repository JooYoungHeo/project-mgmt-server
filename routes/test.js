const express = require('express');
let models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  findProject().then(result => {
      res.json(result);
  }).catch(err => {
      res.status(500).json(err);
  });
});

function findProject() {
    return new Promise((resolve, reject) => {
        models.Project.findAll().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    })
}

module.exports = router;