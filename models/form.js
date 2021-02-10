const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        required: true
    },
   
    fields: [
        {
            label: String,
            name: String,
            type: String
        }
    ],
    
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

});

module.exports = mongoose.model('Form', formSchema);
