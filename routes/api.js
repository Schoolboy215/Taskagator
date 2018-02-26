module.exports = function(app){
    return new Promise(function(resolve, reject) {
        var express = require('express');
        var router = express.Router();

        var MongoClient = require('mongodb').MongoClient;
        var mongoose = require('mongoose');

        const assert = require('assert');
        const url = "mongodb://jmckay:fitz7000@cluster0-shard-00-00-xb5wm.mongodb.net:27017,cluster0-shard-00-01-xb5wm.mongodb.net:27017,cluster0-shard-00-02-xb5wm.mongodb.net:27017/taskagator?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
        // Database Name
        const dbName = 'taskagator';

        // Use connect method to connect to the server
        new Promise(function(resolve,reject)
        {
            mongoose.connect(url);
            const db = mongoose.connection;

            assert.notEqual(null,db);
            console.log("Mongoose has connected to mangoDB");

            resolve(db);
            //const db = MongoClient.connect(url, function(err, client) {
            //    assert.equal(null, err);
            //    console.log("API connected to mongoDB");
        
            //    const db = client.db(dbName);
            //    resolve(db);
            //});
        }).then(function(db){
            router.get('/', (req,res) =>{
                res.send('api works');
            });
            require('./users')(app,db);
            require('./clients')(app,db);
            resolve(router);
        });
    });
}