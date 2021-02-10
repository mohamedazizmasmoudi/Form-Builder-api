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
    
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

});

module.exports = mongoose.model('FullForms', fullFormsSchema);
