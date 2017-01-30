var path = require('path')
var webpack = require('webpack')

var environment = require('./environment.js');

const environmentPlugin = new webpack.DefinePlugin({
  __API_ROOT_URL__: JSON.stringify(environment.apiRootUrl)
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index',
    './styles/styles.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    environmentPlugin,
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread', 'lodash', 'transform-react-constant-elements', 'transform-react-inline-elements']
        },
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  }
}
