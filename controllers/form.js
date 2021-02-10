const Form = require('../models/form');
const FullForms = require('../models/fullForms');



exports.getFromDB = (req, res) => {

    Form.find({}).exec((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)

        }
        res.status(200).json(data) 
    });

    
  }

  exports.getFromDB2 = (req, res) => {

    FullForms.find({ "index": req.body.index }).toArray((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        res.send(data)
    });

    
}
exports.getFromDBbyName = (req, res) => {

    Form.find({ name: req.body.name }).exec((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        res.status(200).json(data) 
    });

    
}

exports.addFormToDB = (req, res) => {
    const form =  new Form();
    form.name=req.body.name
    form.counter=req.body.counter
    console.log(req.body.fields[0])
    form.fields[0]=req.body.fields[0]
    console.log(form)
     form.save();
  
      res.status(200).json() 
}
exports.updatingCounterInDB = (req, res) => {

    const myquery = { name: req.body.name };
    const newvalues = { $set: { name: req.body.name , counter: counter } };
    Form.updateOne(myquery, newvalues, function (err, result) {
    });
    res.send()

    
}
exports.addFormToDB2 = (req, res) => {
 
    FullForms.insertOne(req.body), function (err, result) {
    }
    
res.send()
    
}