var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

var clientSchema = Schema({
    name: String
});

var taskSchema = Schema({
    developer: { type: Schema.Types.ObjectId, ref: 'User'},
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    name: String,
    description: String,
    link: String
});

exports.User = mongoose.model('User', userSchema);
exports.Client = mongoose.model('Client', clientSchema);
exports.Task = mongoose.model('Task', taskSchema);