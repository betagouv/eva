afterEach(function () {
  document.body.innerHTML = '';
});

const context = require.context('./tests', true, /\.js$/);
context.keys().forEach(context);
