var express = require('express');

var app = express();
var directory = '/' + (process.env.STATIC_DIR || 'public');

app.use(express.static(__dirname + directory));

var port = process.env.PORT || 7700;
app.listen(port, function () {
  console.log('Listening on', port);
});
