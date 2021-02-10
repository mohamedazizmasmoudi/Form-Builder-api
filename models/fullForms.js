const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const fullFormsSchema = new mongoose.Schema({
    form: {
        type: ObjectId,
        ref: 'Form'
    },
   
    formSubmissions: [
        {
            input: String,
            value: String
        }
    ],
    form: {
        type: ObjectId,
        ref: 'Form'
    },
	user: {
        type: ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

});

module.exports = mongoose.model('FullForms', fullFormsSchema);
