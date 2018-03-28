// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = {

    // Used to post a session
    postSession: function(app, route) {
        app.post(route, (req, res) => {
            const newSession = {...req.body}
            db.Session.create(newSession, (err, session) => res.json(session))
        })
    },
};