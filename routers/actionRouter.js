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