const express = require('express');
const {getFromDB2,getFromDBbyName,addFormToDB,updatingCounterInDB,addFormToDB2,getFromDB} = require('../controllers/form');


const router = express.Router();
//get document from DB2 by index
router.post('/customers/getnewDB',getFromDB2 );

router.post('/customers/getForm',getFromDBbyName );
router.post('/customers/add',addFormToDB );
router.post('/customers/update',updatingCounterInDB );
router.post('/customers/newDB',addFormToDB2 );
router.get('/customers/get',getFromDB );


module.exports = router;












