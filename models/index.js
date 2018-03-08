var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = Schema({
    name: { type : String, unique : true, required : true }
});

var taskSchema = Schema({
    developer: { type: object, ref: 'User'},//{ type: Schema.Types.ObjectId, ref: 'User'},
    client: { type: clientSchema },
    name: String,
    description: String,
    link: String
});

userSchema = Schema({
    name: { type : String, unique : true, required : true },
    status: {type: String},
    tasks: [taskSchema]
});

exports.User = mongoose.model('User', userSchema);
exports.Client = mongoose.model('Client', clientSchema);
exports.Task = mongoose.model('Task', taskSchema);