var webpack = require('webpack');

var config = require('./webpack.base.js');
console.log(config.entry)

config.devtool = 'source-map'; // regular source maps

//Configure the plugin
/*var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    drop_console: true
  }
});*/

//Get a handle the base config's plugins array and add the plugin
config.plugins = config.plugins || [ ];
//config.plugins.push(uglifyPlugin);
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
);

module.exports = config;
