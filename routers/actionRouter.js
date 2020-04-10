// dependencies
const express = require('express');

const db = require('../data/helpers/actionModel');

// router setup
const router = express.Router();

// endpoints
// ----- BASE URL: /api/actions -----
router.get('/', (req, res) => {
    db.get()
        .then((actions) => {
            res.status(200).json({ actions })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not retrieve actions.'
            })
        })
})

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then((action) => {
            res.status(200).json({ action })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not retrieve action.'
            })
        })
})

router.put('/:id', [validateActionId, validateAction], (req, res) => {
    const id = req.params.id;
    const newAction = req.body;
    db.update(id, newAction)
        .then((action) => {
            res.status(200).json({ action })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not update action.'
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((count) => {
            res.status(200).json({
                message: `Successfully deleted ${count} action${count === 1 ? '' : 's'}.`
            })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not delete action.'
            })
        })
})

// custom middleware
function validateAction(req, res, next) {
    const newAction = req.body;
    if (newAction.description && newAction.notes) {
        if (newAction.description.length <= 128) {
            next();
        }
        else {
            res.status(400).json({
                message: 'Description length exceeds character limit (128).'
            })
        }
    } else {
        res.status(400).json({
            message: 'Action is missing description and/or notes.'
        })
    }
}

function validateActionId(req, res, next) {
    id = req.params.id;
    db.get(id)
        .then((valid) => {
            if (valid) {
                next();
            } else (
                res.status(400).json({
                    message: 'Action ID invalid.'
                })
            )
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: 'Could not validate action ID.'
            })
        })
}

module.exports = router;