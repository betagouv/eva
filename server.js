var express = require('express');
var path = require('path');

var app = express();

var directory = path.join('/', (process.env.STATIC_DIR || 'public'));
var router = express.Router();

function gereRedirectionJeu(req, res) {
  var cheminRedirection = req.path.replace('/jeu', '');
  var urlRedirection = process.env.URL_JEUX + cheminRedirection;
  if (req.query && Object.keys(req.query).length > 0) {
    var params = new URLSearchParams(req.query).toString();
    urlRedirection += '?' + params;
  }
  res.redirect(urlRedirection);
}

router.get('/jeu', gereRedirectionJeu);
router.get('/jeu/*', gereRedirectionJeu);

app.use('/', router);
app.use(express.static(path.join(__dirname, directory)));

var port = process.env.PORT || 7700;
app.listen(port, function () {
  console.log('Listening on', port);
});
