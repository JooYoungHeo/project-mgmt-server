const express = require('express');
const _ = require('lodash');
let models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
   let manager = req.query.manager;
   let projectType = req.query.project_type;

   findProjects(manager, projectType).then(result => {
       res.json(result);
   }).catch(err => {
       res.status(500).json(err);
   });
});

function findProjects(manager, projectType) {

    let whereCondition = {};

    if (!_.isUndefined(manager)) whereCondition['manager'] = manager;
    if (!_.isUndefined(projectType)) whereCondition['project_type'] = projectType;

    models.Project.hasMany(models.Category);
    models.Category.belongsTo(models.Project);

    return new Promise((resolve, reject) => {
        models.Project.findAll({
            attributes: ['id', 'manager', 'start_date', 'due_date', 'project_type', 'active'],
            where: whereCondition,
            include: [{
                model: models.Category
            }]
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

router.get('/:projectId', (req, res) => {
    let projectId = Number(req.params.projectId);

    findProjectById(projectId).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

function findProjectById(projectId) {

    models.Project.hasMany(models.Category);
    models.Category.belongsTo(models.Project);

    return new Promise((resolve, reject) => {
        models.Project.findOne({
            attributes: ['id', 'manager', 'start_date', 'due_date', 'project_type', 'active'],
            where: {
                id: projectId
            },
            include: [{
                model: models.Category
            }]
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = router;