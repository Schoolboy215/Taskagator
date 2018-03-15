const config = require("../config/mongoDB");

module.exports = function(app){
    return new Promise(function(resolve, reject) {
        var express = require('express');
        var router = express.Router();

        var MongoClient = require('mongodb').MongoClient;
        var mongoose = require('mongoose');

        const assert = require('assert');
        const url = config.connectionString;
        // Database Name
        const dbName = 'taskagator';

        // Use connect method to connect to the server
        new Promise(function(resolve,reject)
        {
            mongoose.connect(url);
            const db = mongoose.connection;

            assert.notEqual(null,db);
            console.log("Mongoose has connected to mongoDB");

            resolve(db);
        }).then(function(db){
            router.get('/', (req,res) =>{
                res.send('api works');
            });
            require('./users')(app,db);
            require('./clients')(app,db);
            require('./tasks')(app,db);
            resolve(router);
        });
    });
}