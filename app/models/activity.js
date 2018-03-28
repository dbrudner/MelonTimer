const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    type: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Activity', activitySchema);