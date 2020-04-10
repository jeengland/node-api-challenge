// dependencies
const express = require('express');

const db = require('../data/helpers/projectModel');

// router setup
const router = express.Router();

// endpoints
// ----- BASE URL: /api/projects -----
router.get('/', (req, res) => {
  db.get()
    .then((projects) => {
        res.status(200).json({ projects })
    })  
    .catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Could not retrieve projects.'
        })
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then((project) => {
            res.status(200).json({ project })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not retrieve project.'
            })
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.getProjectActions(id)
        .then((actions) => {
            res.status(200).json({ actions })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not retrieve project actions.'
            })
        })
})

router.post('/', validateProject, (req, res) => {
    const newProject = req.body;
    db.insert(newProject)
        .then((project) => {
            res.status(201).json({ project })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not create project.'
            })
        })
})

router.put('/:id', [validateProject, validateProjectId], (req, res) => {
    const id = req.params.id;
    const newProject = req.body;
    db.update(id, newProject)
        .then((project) => {
            res.status(200).json({ project })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not update project.'
            })
        })   
})

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((count) => {
            res.status(200).json({
                message: 'Project successfully deleted.'
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not delete project.'
            })
        })
})

// custom middleware
function validateProject(req, res, next) {
    const newProject = req.body;
    if (newProject.name && newProject.description) {
        next();
    } else {
        res.status(400).json({
            message: 'Project is missing name and/or description.'
        })
    }
}

function validateProjectId(req, res, next) {
    const id = req.params.id;
    db.get(id)
        .then((valid) => {
            if (valid) {
                next();
            } else {
                res.status(400).json({
                    message: 'Project ID invalid.'
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not validate project ID.'
            })
        })
}

module.exports = router;