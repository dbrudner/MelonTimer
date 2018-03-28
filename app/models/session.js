const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    activity: String,
    timeElapsed: Number, //in seconds? miliseconds? not sure yet.
    timeStarted: Date,
    timeFinished: Date,
    created_at: { type: Date, required: true, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Session', sessionSchema);