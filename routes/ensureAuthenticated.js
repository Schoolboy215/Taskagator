exports.ensureAuthenticated = function(req,res,next) {
    if (req.isAuthenticated()) { return next(); }
    //res.redirect('/api/auth');
    res.status(401).send("You need to log in first");
}