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

router.post('/:categoryId', (req, res) => {
    let categoryId = Number(req.params.categoryId);
    let categoryName = req.body.name;
    let worker = req.body.worker;
    let wbs = req.body.wbs;
    let startDate = req.body.start_date;
    let dueDate = req.body.due_date;
    let active = req.body.active;
    let updateObject = {};

    if (!_.isUndefined(categoryName)) updateObject['category_name'] = categoryName;
    if (!_.isUndefined(worker)) updateObject['worker'] = worker;
    if (!_.isUndefined(wbs)) updateObject['wbs'] = wbs;
    if (!_.isUndefined(startDate)) updateObject['start_date'] = startDate;
    if (!_.isUndefined(dueDate)) updateObject['due_date'] = dueDate;
    if (!_.isUndefined(active)) updateObject['active'] = active;

    updateCategory(categoryId, updateObject).then(() => {
        res.json({id: categoryId});
    }).catch(err => {
        res.status(500).json(err);
    });
});

function updateCategory(id, updateObject) {
    return new Promise((resolve, reject) => {
        models.Category.update(updateObject, {
            where: {
                id: id
            }
        }).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = router;
