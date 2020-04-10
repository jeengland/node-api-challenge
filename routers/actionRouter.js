// dependencies
const express = require('express');

const db = require('../data/helpers/actionModel');

// router setup
const router = express.Router();

// endpoints
// ----- BASE URL: /api/actions -----

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

module.exports = router;