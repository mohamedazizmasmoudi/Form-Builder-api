const Form = require('../models/form');
const FullForms = require('../models/fullForms');



exports.getFromDB = (req, res) => {

    Form.find().exec((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)

        }
        console.log("fdjmfslfksdf",data)
        res.status(200).json(data) 
    });

    
  }

  exports.getFromDB2 = (req, res) => {



    FullForms.find({ form: req.body.form }).exec((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
		 res.status(200).json(data) 

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
    console.log(req.body.fields.length())
    for(i=0;i<req.body.fields.length();i++){
        console.log("jefk")
    form.fields[i]=req.body.fields[i]
    console.log(form)

}
    console.log(form)
     form.save();
  
      res.status(200).json() 
}
exports.updatingCounterInDB = (req, res) => {

 Form.find({form: req.body.form   }).exec((err, data) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
		data.counter=req.body.counter
		data.save()
        res.status(200) 
    });


    
}
exports.addFormToDB2 = (req, res) => {
 const fullform =new FullForms();
 
  fullform.user=req.params.user
    fullform.form=req.params.form
    fullform.formSubmissions[0]=req.body.formSubmissions[0]
    console.log(fullform)
     fullform.save();
  
      res.status(200).json() 
    
}