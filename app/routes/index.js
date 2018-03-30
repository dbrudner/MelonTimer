const userRoutes = require('./user-routes')
const reactRoutes = require('./react-routes')
const activityRoutes = require('./activity-routes')
const sessionRoutes = require('./session-routes')

module.exports = function (app, passport) {

    // Gets list of activities to populate datalist
    activityRoutes.getActivities(app, '/activities')

    // Records a session
    sessionRoutes.postSession(app, '/new/session')

    // Checks if a user is logged in
    userRoutes.test(app, '/test')

    // Logs a user out
    userRoutes.logout(app, '/logout')

    // Logs a user in
    userRoutes.login(app, passport, '/login')

    // Signs up
    userRoutes.signup(app, passport, '/signup')
}