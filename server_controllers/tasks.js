const assert = require('assert');
const userModel = require('../models/index').User;
const taskModel = require('../models/index').Task;

exports.deleteTask = function(id, callback) {
  taskModel.findById(id).then( task => {
    userModel.findById(task.developer).
    populate({path : 'tasks'}).
    exec( (err,user) => {
      //user.tasks.id(task._id.toString()).remove();
      user.tasks.splice(user.tasks.indexOf(task._id),1);
      user.save( function(err) {
        task.remove();
        callback(err);
      });
    });
  });
}
exports.updateTask = function(id, newVersion, callback) {
  taskModel.findById(id, (err, task) => {
    task.set( { name: newVersion.name,
                description: newVersion.description,
                link: newVersion.link
              });
    task.save( (err, updatedTask) => {
      callback(updatedTask);
    });
  });
}
exports.getAllTasks = function(callback) {
  taskModel.find().
  populate('client').
  populate('developer').
  exec((err, tasks) => {
    callback(tasks);
  });
}