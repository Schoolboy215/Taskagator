const assert = require('assert');
const userModel = require('../models/index').User;
const taskModel = require('../models/index').Task;

//User management functions
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
exports.get = function(name, callback) {
  userModel.findOne({'name' : name}, function(err, user) {
    callback(user);
  });
}
exports.update = function(name, newUser, callback) {
  userModel.updateOne({ 'name' : name }, newUser, function(err, user) {
    callback(user);
  });
}
exports.deleteUser = function(name, callback) {
  userModel.deleteOne({'name' : name }, function(err) {
    callback(err);
  });
}

//User-Task functions
exports.getTasks = function(name, callback) {
  callback(userModel.findOne({'name' : name}).tasks);
}
exports.addTask = function(name, callback) {
  const user = userModel.findOne({'name' : name});
  var newTask = new taskModel( {
    developer: user,
    name: "TestName",
    description: "TestDescription",
    link: "TestLink"
  });
  newTask.save();

  user.tasks.push(newTask);
  user.save();
  callback(user);
}