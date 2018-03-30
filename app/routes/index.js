const userRoutes = require('./user-routes')
const reactRoutes = require('./react-routes')
const sessionRoutes = require('./session-routes')

module.exports = function (app, passport) {

    // Gets list of activities to populate datalist
    sessionRoutes.getAllActivities(app, '/activities')

    // Records a session
    sessionRoutes.postSession(app, '/new/session')

    // Get all sessions from a user
    sessionRoutes.getSessions(app, '/sessions/:userId')

    // Checks if a user is logged in
    userRoutes.test(app, '/test')

    // Logs a user out
    userRoutes.logout(app, '/logout')

    // Logs a user in
    userRoutes.login(app, passport, '/login')

    // Signs up
    userRoutes.signup(app, passport, '/signup')
}