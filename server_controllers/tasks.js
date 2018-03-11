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