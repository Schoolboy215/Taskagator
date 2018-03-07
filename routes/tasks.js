module.exports = function(app, db){
	var url = require('url'),
        express = require('express'),
        router = express.Router();
        
    var taskController = require('../server_controllers/tasks');

    router.delete('/:id', function(req,res) {
        taskController.deleteTask(req.params.id, function(err) {
            if (err)
                res.status(400).send("Couldn't delete");
            else
                res.json("Task deleted");
        });
    });

    app.use('/api/tasks',router);
    return router;
};