const assert = require('assert');
const userModel = require('../models/index').User;
const taskModel = require('../models/index').Task;
const clientModel = require('../models/index').Client;

//User management functions
exports.createUser = function(name, callback) {
  userModel.create({name : name, status : ""}, function(err, result) {
    if (err)
      callback(err.errmsg.toString());
    else
      callback(result);
  });
}
exports.getAll = function(callback) {
  userModel.find()
  .sort('name').
  exec((err, users) => {
    assert.equal(err, null);
    callback(users);
  });
}
exports.get = function(name, callback) {
  userModel.findOne({'name' : name}).
  populate({  path: 'tasks',
              populate: { path: 'client'}
  }).
  exec(function(err, user) {
    callback(user);
  });
}
exports.update = function(name, newUser, callback) {
  userModel.updateOne({ 'name' : name }, newUser, function(err, user) {
    callback(user);
  });
}
exports.deleteUser = function(name, callback) {
  userModel.findOne({'name': name}).then(user => {
    taskModel.deleteMany({'developer' : user._id}). then( result =>{
      userModel.deleteOne({'name' : name }, function(err) {
        callback(err);
      });
    });
  });
}

//User-Task functions
exports.addTask = function(name, task, callback) {
  userModel.findOne({'name' : name}, (err, user) => {
    clientModel.findOne({'_id' : task.client}, (err, client) => {
      var newTask = new taskModel( {
        developer: user._id,
        client: client,
        name: task.name,
        description: task.description,
        link: task.link
      });
      newTask.save( err => {
        if (!err){
          user.tasks.push(newTask);
          user.save();
          callback(user);
        }
        else
          callback(err);
      });      
    });
  });
}