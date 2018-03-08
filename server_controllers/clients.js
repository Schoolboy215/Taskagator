const clientModel = require('../models/index').Client;
const taskModel = require('../models/index').Task;

exports.createClient = function(name, callback) {
  clientModel.create({name : name}, function(err, result) {
    try{
      if (err != null)
        throw err;
      callback(result.name + " was added as a client");
    }
    catch (err) {
      callback(err.errmsg.toString());
    }
  });
}
exports.getAll = function(callback) {
  clientModel.find(function(err, clients) {
    callback(clients);
  });
}

exports.get = function(name, callback) {
  clientModel.findOne({ 'name' : name }, function(err, client) {
    callback(client);
  });
}
exports.getTasks = function(client, callback) {
  taskModel.find({'client' : client}).then(tasks => {
    callback(tasks);
  });
}
exports.delete = function(name, callback) {
  clientModel.deleteOne({ 'name' : name}, function(err) {
    callback("Client deleted");
  });
}
exports.update = function(name, newClient, callback) {
  clientModel.updateOne({ 'name' : name }, newClient, function(err, client) {
    callback(newClient);
  });
}