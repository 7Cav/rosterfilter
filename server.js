var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');
var app = express();

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var keys = require('./keys/credentials');
var api_key = keys.cred_key;

app.get('/', function(req, res, next) {
  superagent.get('https://api.7cav.us/api/v1/roster/ROSTER_TYPE_COMBAT')
  .set({ 'Authorization': api_key, Accept: 'application/json' })
  .end(function(err, response) {
    if (err) {
      next(err);
    }
    return res.render('index', response.body);
  })
});

app.get('/reserve', function(req, res, next) {
  superagent.get('https://api.7cav.us/api/v1/roster/ROSTER_TYPE_RESERVE')
  .set({ 'Authorization': api_key, Accept: 'application/json' })
  .end(function(err, response) {
    if (err) {
      next(err);
    }
    return res.render('reserve', response.body);
  })
});


app.use(function(err, req, res, next) {
  console.error(err);
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(404);
  res.send('Error 404');
});

app.listen(3000);