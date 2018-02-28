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
    router.get('/:name',function (req, res) {
        clientController.get(req.params.name, result => {
            if (result != null)
                res.json(result);
            else
                res.status(404).send("That client was not found");
        });
    });
    router.post('/create', function(req,res) {
        clientController.createClient(req.body.name,function(result){
            res.json(result);
        });
    });

    router.delete('/:name', function(req, res) {
        clientController.delete(req.params.name, function(result){
            res.json(result);
        });
    });

    router.put('/:name', function(req,res) {
        clientController.update(req.params.name, req.body, function(result) {
            res.json(result);
        });
    });

    app.use('/api/clients',router);
    return router;
};