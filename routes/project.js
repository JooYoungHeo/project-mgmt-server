const express = require('express');
const _ = require('lodash');
let models = require('../models');

const router = express.Router();

router.get('/:projectId', (req, res) => {
    let projectId = Number(req.params.projectId);
    let projectType = req.query.project_type;

    findProjectById(projectId, projectType).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

function findProjectById(projectId, projectType) {

    let whereCondition = {id: projectId};

    if (!_.isUndefined(projectType)) whereCondition['project_type'] = projectType;

    return new Promise((resolve, reject) => {
        models.Project.findOne({
            attributes: ['id', 'manager', 'start_date', 'due_date', 'project_type', 'active'],
            where: whereCondition
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = router;