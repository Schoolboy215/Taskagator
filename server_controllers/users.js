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
exports.addTask = function(name, task, callback) {
  userModel.findOne({'name' : name}, (err, user) => {
    var newTask = new taskModel( {
      developer: user._id,
      client: task.client,
      name: task.name,
      description: task.description,
      link: task.link
    });
    newTask.save();
  
    user.tasks.push(newTask);
    user.save();
    callback(user);
  });
}
exports.getTasks = function(user, callback) {
  taskModel.find({'developer' : user._id}, (err, tasks) => {
    callback(tasks);
  });
}