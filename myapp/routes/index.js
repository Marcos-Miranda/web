var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/publish', function(req, res, next){
  if(req.cookies && req.cookies.login){
    res.render('publicacoes');
  }else{
    res.redirect('users/login');
  }
});

module.exports = router;
