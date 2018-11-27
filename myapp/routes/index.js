var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var publiDAO = require('../models/publications')
var hb = require('express-handlebars').create();

/* GET home page. */
router.get('/', function(req, res, next) {
  publiDAO.find().then((publis) =>{
    res.render("index", {propaganda: publis});
  });
});

router.get('/publish', function(req, res, next){
  if(req.cookies && req.cookies.login){
    res.render('publicacoes');
  }else{
    res.redirect('users/login');
  }
});

router.post('/busca', function(req, res, next){
  var keyWord = req.body.busca;
  if(!keyWord){
    res.redirect('/');
  }
  publiDAO.findBySearch(keyWord).then((publis) =>{
    res.render('index', {propaganda: publis});
  });

});

router.post('/publish', function(req, res, next){
  
  if(!req.cookies && !req.cookies.login){
    res.send('ah malandro');
    res.redirect('users/login');
    return;
  }

  var form = formidable.IncomingForm();
  var login = req.cookies.login;

  form.parse(req, function(err, fields, files){
    var titulo = fields.titulo;
    var descricao = fields.descricao;
    if(!titulo || !descricao || !files.imageP || !files.imageS){
      res.send('Os campos devem ser preenchidos e as imagens enviadas');
      res.end();
      return;
    }
    publiDAO.insert(login, titulo, descricao);
    var oldpathP = files.imageP.path;
    var newpathP = './public/images/'+titulo+'P.jpg';
    var oldpathS = files.imageS.path;
    var newpathS = './public/images/'+titulo+'S.jpg';
    fs.rename(oldpathP, newpathP, function (err) {
      if (err) throw err;
    });
    fs.rename(oldpathS, newpathS, function (err) {
      if (err) throw err;
    });
    res.redirect('/publish')
  });

});

module.exports = router;
