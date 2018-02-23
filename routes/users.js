module.exports = function(app, db){
	var url = require('url'),
        express = require('express'),
        router = express.Router();
        
    var userController = require('../server_controllers/users');

	router.get('/',function (req, res) {
        userController.getAll(db, function(result) {
            res.json(result);
        });
    });
    router.get('/:id',function (req, res) {
        res.send("This is for getting user " + req.params.id)
    });
    router.post('/create', function(req,res) {
        userController.createUser(req.body.name,function(result){
            res.send(result);
        });
    });

    app.use('/api/users',router);
    return router;
};