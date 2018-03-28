// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = {

    // Used to get all activities for populating select field
    getActivities: function(app, route) {
        app.get(route, (req, res) => {
            db.Activity.find()
            .exec(activities => {
                res.json(activities)
            })
        })
    },

    addActivity: function(app, route) {
        app.post(route, (req, res) => {
            const newActivity = req.body.activity
            db.Activity.create(newActivity, (err, activity) => res.json(activity))
        })
    }
};