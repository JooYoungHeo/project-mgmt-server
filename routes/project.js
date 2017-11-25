const express = require('express');
const _ = require('lodash');
let util = require('./util');
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
                model: models.Category,
                attributes: ['id', 'category_name', 'worker', 'wbs', 'start_date', 'due_date', 'active', 'parent', 'project_id']
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
                model: models.Category,
                attributes: ['id', 'category_name', 'worker', 'wbs', 'start_date', 'due_date', 'active', 'parent', 'project_id']
            }]
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

router.post('/', (req, res) => {
    let manager = req.body.manager;
    let startDate = req.body.start_date;
    let dueDate = req.body.due_date;
    let projectType = req.body.project_type;
    let large = req.body.large;
    let workerList;
    let projectId;

    createProject(manager, startDate, dueDate, projectType).then(result => {
        projectId = result.id;
        let cateAndWorkerList = convertCategoryList(result.id, large);
        workerList = cateAndWorkerList.workerList;

        return createCategories(cateAndWorkerList.categoryList);
    }).then(() => {
        util.sendMail(workerList);
        res.json({id: projectId});
    }).catch(err => {
        res.status(500).json(err);
    });
});

function convertCategoryList(id, large) {
    let categoryList = [];
    let workerList = [];

    for (let i = 0 ; i < large.length ; i++) {
        let largeElement = large[i];
        let parent = largeElement.name;

        for (let j = 0 ; j < largeElement.small.length ; j++) {
            let smallElement = largeElement.small[j];

            categoryList.push({
                category_name: smallElement.name,
                worker: smallElement.worker,
                wbs: smallElement.wbs,
                start_date: smallElement.start_date,
                due_date: smallElement.due_date,
                parent: parent,
                active: true,
                project_id: id
            });

            workerList.push(smallElement.worker);
        }
    }

    return {categoryList: categoryList, workerList: workerList};
}

function createProject(manager, startDate, dueDate, projectType) {
    return new Promise((resolve, reject) => {
        models.Project.create({
            manager: manager,
            start_date: startDate,
            due_date: dueDate,
            project_type: projectType,
            active: true
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

function createCategories(categoryList) {
    return new Promise((resolve, reject) => {
        models.Category.bulkCreate(categoryList).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

router.post('/:projectId', (req, res) => {
    let projectId = Number(req.params.projectId);
    let manager = req.body.manager;
    let startDate = req.body.start_date;
    let dueDate = req.body.due_date;
    let updateObject = {};

    if (!_.isUndefined(manager)) updateObject['manager'] = manager;
    if (!_.isUndefined(startDate)) updateObject['start_date'] = startDate;
    if (!_.isUndefined(dueDate)) updateObject['due_date'] = dueDate;

    updateProject(projectId, updateObject).then(() => {
        res.json({id: projectId});
    }).catch(err => {
        res.status(500).json(err);
    });
});

function updateProject(id, updateObject) {
    return new Promise((resolve, reject) => {
        models.Project.update(updateObject, {
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
