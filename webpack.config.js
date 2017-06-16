const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    '../client/index.jsx'
    ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
       {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=25000'
    },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
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
  ],
};
