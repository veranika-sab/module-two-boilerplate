var HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack');
var path = require('path');
var root = path.join(__dirname);
var appPath = path.join(__dirname, 'src');

var env = process.env.NODE_ENV || 'dev';
var debug = env !== 'production';

var plugins = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(appPath, "index.html"),
    minify: false
  }),
  new CleanWebpackPlugin(['dist'], {
    root: root,
    verbose: true
  })
]

if (!debug) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: {
    bundle: './src/main.js'
  },
  devtool: 'cheap-module-inline-source-map',
  debug: debug,
  output: {
    path: './dist',
    filename: '[hash].bundle.js'
  },
  devServer: {
    host: 'localhost',
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(svg|gif|png|jpe?g)$/,
        loader: 'file',
        query: {
          name: '[path][name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file'
      }
    ]
  },
  plugins: plugins
}
