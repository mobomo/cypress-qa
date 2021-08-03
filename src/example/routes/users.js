var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  let json = getUser(req);
  if (json !== null) {
    res.render('user', {user: json.user});
  }
  else {
    res.render('index', {title: 'Hello'});
  }
});

router.get('/iframe', function(req, res, next) {
  res.render('iframe');
});

router.get('/login', function(req, res, next) {

  let json = getUser(req);

  if (json !== null) {
    res.redirect('/users');
  }
  else {
    res.render('login');
  }

});

router.get('/logout', function(req, res, next) {

  res.cookie('SESS', {maxAge: 0});
  res.redirect('/users');

});

router.post('/register', function(req, res, next) {

  if (req.body.user === 'admin' && req.body.pass === 'admin') {

    let encoded = new Buffer(JSON.stringify(req.body), 'ascii').toString('base64');
    res.cookie('SESS', encoded, {maxAge: 900000, httpOnly: true})

    console.log('Got body:', encoded);

    //res.send('<meta http-equiv="refresh" content="0;URL=\'/users\'" /> ')
  }

  res.redirect('/users/login');
});

function getUser(req) {
  let json = null;
  try {
    let encoded = req.cookies.SESS;
    let decoded = new Buffer(encoded, 'base64').toString('ascii');
    json = JSON.parse(decoded);
  }
  catch(e) {
    jason = null;
  }

  return json;
}

module.exports = router;
