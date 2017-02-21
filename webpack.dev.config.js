var webpack = require('webpack')

var config = require('./webpack.base.js')

config.entry.unshift('webpack-hot-middleware/client')

//Get a handle the base config's plugins array and add the plugin
config.plugins = config.plugins || [ ]
config.plugins.push(new webpack.HotModuleReplacementPlugin())

// enable react HMR
config.module.rules.forEach((loader) => {
  if (loader.test.test('.js')) {
    loader.options.presets.push('react-hmre')
  }
});

module.exports = config;