module.exports = function(app, db){
	var url = require('url'),
        express = require('express'),
        router = express.Router();
        
    var userController = require('../server_controllers/users');

	router.get('/',function (req, res) {
        userController.getAll(function(result) {
            res.json(result);
        });
    });
    router.get('/:name',function (req, res) {
        userController.get(req.params.name, result => {
            if (result != null)
                res.json(result);
            else
                res.status(404).send("That user was not found");
        });
    });
    router.post('/create', function(req,res) {
        userController.createUser(req.body.name,function(result){
            res.send(result);
        });
    });
    router.put('/:name', function(req,res) {
        userController.update(req.params.name, req.body, function(result) {
            res.json(result);
        });
    });
    router.delete('/:name', function(req,res) {
        userController.deleteUser(req.params.name, function(err) {
            if (err)
                res.status(400).send("Couldn't delete");
            else
                res.json("User deleted");
        });
    });

    router.put('/:name/tasks', function(req,res) {
        userController.addTask(req.params.name, req.body, result => {
            res.json(result);
        });
    })
    router.get('/:name/tasks', function(req,res) {
        userController.get(req.params.name, result => {
            userController.getTasks(result, tasks => {
                res.json(tasks);
            })
        });
    });

    app.use('/api/users',router);
    return router;
};