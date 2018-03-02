const assert = require('assert');
const userModel = require('../models/index').User;

exports.createUser = function(name, callback) {
  userModel.create({name : name, status : ""}, function(err, result) {
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

exports.update = function(name, newUser, callback) {
  userModel.updateOne({ 'name' : name }, newUser, function(err, user) {
    callback(user);
  });
}