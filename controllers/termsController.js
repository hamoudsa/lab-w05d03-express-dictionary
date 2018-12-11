var express = require('express');
var router = express.Router();

var term = require('../models/term');

router.get('/', term.getAll, renderIndex);
router.get('/new', renderNew);
router.post('/', term.create, redirectShow);
router.get('/:id', term.find, renderShow);
router.delete('/:id', term.delete, redirectindex);


function renderIndex(req, res){
    var termVariables = {
        termList: res.locals.term
    }
    //console.log(termVariables);
    res.render('./terms/index', termVariables)
};

function renderNew(req, res){
    res.render('./terms/new')
}

function renderShow(req, res){
    var termVariables = {
        termList: res.locals.term
    };
    console.log(termVariables)
    res.render('./terms/show', termVariables);
};

function redirectindex(req, res){
    res.redirect('/terms')
}

function redirectShow(req, res){
    res.redirect('/terms/'+res.locals.term_id);
}


 

module.exports = router;