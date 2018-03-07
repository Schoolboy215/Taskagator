const assert = require('assert');
const userModel = require('../models/index').User;
const taskModel = require('../models/index').Task;

exports.deleteTask = function(id, callback) {
  taskModel.deleteOne({'_id' : id}).then( err =>{
    callback(err);
  });
}