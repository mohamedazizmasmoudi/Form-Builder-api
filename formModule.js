const mongo = require('mongodb');
const assert = require('assert');

const mongoUrl ='mongodb+srv://atlas:atlas@cluster0.ztt1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = mongo.MongoClient;

module.exports = {
    getFromDB: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                if (err) {
                    console.log(err);
                }
                const db = client.db("form_builder");
                const collection = db.collection('forms');
                collection.find({}).toArray((err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    client.close();
                    resolve(data);
                });

            });
        })
    },
    getFromDB2: (index) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                if (err) {
                    console.log(err);
                }
                const db = client.db("form_builder");
                const collection = db.collection('fullForms');
                collection.find({ "form._id": index }).toArray((err, data) => {
                    console.log(data,index)
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    client.close();
                    resolve(data);
                });
            });
        })
    },
    getFromDBbyName: (name) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                if (err) {
                    console.log(err);
                }
                console.log("name",name)
                const db = client.db("form_builder");
                const collection = db.collection('forms');
                collection.find({ "name": name }).toArray((err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    client.close();
                    resolve(data);
                });
            });
        })
    },
    addFormToDB: (body)=>{
        return new Promise((resolve,reject) =>{
            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                if (err) {
                  console.log(err);
                  reject(err);
                }
                const db = client.db("form_builder");
                const collection = db.collection('forms');
                collection.insertOne(body), function (err, result) {
                  test.equal(null, err);
                }
                client.close();
                resolve()
              });
        })
    },

    updatingCounterInDB: (name, counter)=>{
        return new Promise((resolve,reject) =>{
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
            assert.equal(null, err);
            if (err) {
              console.log(err);
              reject(err);
            }
            const db = client.db("form_builder");
            const collection = db.collection('forms');
            const myquery = { name: name };
            const newvalues = { $set: { name: name, counter: counter } };
            collection.updateOne(myquery, newvalues, function (err, result) {
            });
            client.close();
            resolve('');
          });
        })
    },
    addFormToDB2: (body)=>{
        return new Promise ((resolve,reject) =>{

            MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                if (err) {
                  console.log(err);
                  reject(err);
                }
                const db = client.db("form_builder");
                const collection = db.collection('fullForms');
                console.log(body,"body")
                collection.insertOne(body), function (err, result) {
                  test.equal(null, err);
                }
                client.close();
              });
              resolve('');
        });
    },
};