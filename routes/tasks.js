module.exports = function(app, db){
	var url = require('url'),
        express = require('express'),
        router = express.Router();
        
    var taskController = require('../server_controllers/tasks');

    router.delete('/:id', function(req,res) {
        taskController.deleteTask(req.params.id, function(result) {
            res.json(result);
        });
    });
    router.put('/:id', function(req,res) {
        taskController.updateTask(req.params.id, req.body.task, result => {
            res.json("Task updated");
        });
    });
    app.use('/api/tasks',router);
    return router;
};