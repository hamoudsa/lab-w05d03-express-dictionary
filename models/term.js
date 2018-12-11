var db = require('../db/config');
var term = {};

term.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function(result){
        res.locals.term = result;
        next();
    }).catch(function(error){
        console.log(error);
    });
};

term.find = function(req, res, next){
    var id = req.params.id;
    db.one("SELECT * FROM terms WHERE id=$1;", [id])
    .then(function(result){
        res.locals.term = result;
        next();
    }).catch(function(error){
        //console.log(error);
        next();
    });
};

term.delete = function(req, res, next){
    db.none("DELETE FROM terms WHERE id=$1", [req.params.id])
    .then(function(){
        console.log('successful delete');
        next();
    }).catch(function(error){
        console.log(error);
        next();
    });
};

term.create = function(req, res, next){
    db.one("INSERT INTO terms(name, definition) VALUES($1, $2)RETURNING id;", [req.body.name, req.body.definition ])
    .then(function(result){
        res.locals.term_id = result.id;
        next();
    }).catch(function(error){
        console.log(error);
    });
};


module.exports = term;