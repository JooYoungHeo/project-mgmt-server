const express = require('express');
const _ = require('lodash');
let models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
    let worker = req.query.worker;
    let projectId = req.query.project_id;
    let parent = req.query.parent;

    findCategories(worker, projectId, parent).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
});

function findCategories(worker, projectId, parent) {

    let whereCondition = {};

    if (!_.isUndefined(worker)) whereCondition['worker'] = worker;
    if (!_.isUndefined(projectId)) whereCondition['project_id'] = Number(projectId);
    if (!_.isUndefined(parent)) whereCondition['parent'] = parent;

    return new Promise((resolve, reject) => {
        models.Category.findAll({
            attributes: ['id', 'category_name', 'worker', 'wbs', 'start_date', 'due_date', 'active', 'parent', 'project_id'],
            where: whereCondition
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

router.get('/:categoryId', (req, res) => {
    let categoryId = Number(req.params.categoryId);

    findCategoryById(categoryId).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).json(err);
    });

});

function findCategoryById(categoryId) {
    return new Promise((resolve, reject) => {
        models.Category.findOne({
            attributes: ['id', 'category_name', 'worker', 'wbs', 'start_date', 'due_date', 'active', 'parent', 'project_id'],
            where: {
                id: categoryId
            }
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = router;