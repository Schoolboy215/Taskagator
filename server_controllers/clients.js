const assert = require('assert');
const clientModel = require('../models/index').Client;

exports.createClient = function(name, callback) {
  clientModel.create({name : name}, function(err, result) {
    assert.equal(err,null);
    console.log("Inserted client");
    callback(result);
  });
}

exports.getAll = function(callback) {
  clientModel.find(function(err, clients) {
    assert.equal(err, null);
    callback(clients);
  });
}