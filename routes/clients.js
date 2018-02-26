module.exports = function(app, db){
	var url = require('url'),
        express = require('express'),
        router = express.Router();
        
    var clientController = require('../server_controllers/clients');

	router.get('/',function (req, res) {
        clientController.getAll(function(result) {
            res.json(result);
        });
    });
    router.get('/:id',function (req, res) {
        res.send("This is for getting client " + req.params.id)
    });
    router.post('/create', function(req,res) {
        clientController.createClient(req.body.name,function(result){
            res.send(result);
        });
    });

    app.use('/api/clients',router);
    return router;
};