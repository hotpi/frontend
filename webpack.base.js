var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var environment = require('./environment.js');

const environmentPlugin = new webpack.DefinePlugin({
  __API_ROOT_URL__: JSON.stringify(environment.apiRootUrl)
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index',
    './styles/styles.css',
    './node_modules/rc-swipeout/assets/index.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    environmentPlugin,
    new ExtractTextPlugin({
      filename: 'sassyStyle.css', 
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-object-rest-spread', 
            'lodash', 
            'transform-react-constant-elements', 
            'transform-react-inline-elements'
          ],
      	  env: {
      	    production: {
      	      presets: ['babili']
      	    }
      	  }
        },
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: [ 
          'style-loader', 
          'css-loader?importLoaders=1', 
          'postcss-loader' 
        ]
      },
      {
        test: /\.(sass|scss)$/,
        loaders: ExtractTextPlugin.extract({ 
          fallback: 'style-loader', 
          use: [
            'css-loader?importLoaders=1', 
            'postcss-loader', 
            'sass-loader?includePaths[]=' + path.resolve(__dirname, 'node_modules/foundation-sites/scss/')
          ] 
        })
      }
    ]
  }
}
