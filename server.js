var express = require('express');

var app = express();

var directory = '/' + (process.env.STATIC_DIR || 'public');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('/jeu');
});
app.use('/', router);
app.use(express.static(__dirname + directory));

var port = process.env.PORT || 7700;
app.listen(port, function () {
  console.log('Listening on', port);
});
