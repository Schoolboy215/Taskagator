const assert = require('assert');
const userModel = require('../models/index').User;
const taskModel = require('../models/index').Task;

exports.deleteTask = function(id, callback) {
  taskModel.findById(id).then( task => {
    userModel.findById(task.developer).then( user => {
      user.tasks.id(task._id.toString()).remove();
      user.save( function(err) {
        task.remove();
        callback(err);
      });
    });
  });
}