var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')

var express = require('express');

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/styles', express.static(__dirname + '/styles'));

/**
 * Uncomment the following lines and use the production environment to make the AppCache work. 
*/

// app.get('/hotpi.manifest', function(req, res){
//   res.header('Content-Type', 'text/cache-manifest');
//   res.header('Cache-Control', 'no-store, no-cache');
//   res.header('Expires', '-1');
//   res.sendFile(__dirname + '/hotpi.manifest');

// });

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})