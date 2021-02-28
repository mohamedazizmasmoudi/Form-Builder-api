const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
// const formModule = require('./controllers/form');
const formModule = require('./formModule');

dotenv.config();

// db
// mongodb://kaloraat:dhungel8@ds257054.mlab.com:57054/nodeapi
// MONGO_URI=mongodb://localhost/nodeapi
// mongodb+srv://kaloraat_admin:kkkkkk9@nodeapi-pbn7j.mongodb.net/nodeapi?retryWrites=truenodeAPI?retryWrites=true
// mongodb+srv://robertchou_admin:Aeiourc2491@nodeapi-p2o93.mongodb.net/nodeapi?retryWrites=true&w=majority
mongoose
    .connect( 'mongodb+srv://atlas:atlas@cluster0.ztt1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
     {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const corsOptions = {
  origin: "https://war9a.netlify.app" || "https://war9a-tunisie.netlify.app",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
  
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const customersRoutes = require('./routes/customers');

// apiDocs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware -
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(expressValidator());
app.use(cors(corsOptions));
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
// app.use('/api', customersRoutes);
app.post('/api/customers/getnewDB', (req, res) => {
    formModule.getFromDB2(req.body.index).then((data) => {
      res.send(data);
    });
  });
  
  //gets document from DB by name
  app.post('/api/customers/getForm', (req, res) => {
    formModule.getFromDBbyName(req.body.name).then((data) => {
      res.send(data);
    });
  });
  
  //add new form to DB - addFormToDB
  app.post('/api/customers/add', (req, res) => {
    formModule.addFormToDB(req.body).then(() => {
      res.send('');
    });
  });
  
  //update counter in DB after submitting -updatingCounterInDB
  app.post('/api/customers/update', (req, res) => {
      formModule.updatingCounterInDB(req.body.name, req.body.counter).then(() =>{
        res.send('');
      });
    });
  
  //insert new document to DB2 -  addFormToDB2
  app.post('/api/customers/newDB', (req, res) => {
    formModule.addFormToDB2(req.body).then(() =>{
      res.send('');
    });
  });
  
  //return All data in DB
  app.get('/api/customers/get', (req, res) => {
    formModule.getFromDB().then((data) => {
      res.send(data);
    });
  });
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});
