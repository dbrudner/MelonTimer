// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = {

    // Used to post a session
    postSession: function(app, route) {
        app.post(route, (req, res) => {
            const newSession = {...req.body}
            
            db.Session.create(newSession, ((err, session) => {
                res.json(session)
            }))
        })
    },

    getAllActivities: function(app, route) {
        app.get(route, (req, res) => {
            db.Session.find()
            .exec((error, result) => {
                const activities = result.reduce((acc, session) => {
                    if (!acc.includes(session.activity)) return [...acc, session.activity]
                    return acc
                }, [])
                console.log('activities')
                res.json(activities)
            })
        })
    }
}