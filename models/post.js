const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
  
    form: {
        type: ObjectId,
        ref: 'Form'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

});

module.exports = mongoose.model('Post', postSchema);
