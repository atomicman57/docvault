const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
require('dotenv').config();

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: 'source-map',
  entry: ['babel-polyfill', 'webpack-hot-middleware/client', '../client/index.jsx'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico)$/,
        use: 'file-loader?name=./assets/images/[name].[ext]'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  output: {
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.JWTSECRET': JSON.stringify(process.env.JWTSECRET)
    })
  ]
};
