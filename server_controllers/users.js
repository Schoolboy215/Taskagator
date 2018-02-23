const assert = require('assert');
const userModel = require('../models/index').User;

exports.createUser = function(name, callback) {
  userModel.create({name : name}, function(err, result) {
    assert.equal(err,null);
    console.log("Inserted user");
    callback(result);
  });
}

exports.getAll = function(callback) {
  userModel.find(function(err, users) {
    assert.equal(err, null);
    callback(users);
  });
}