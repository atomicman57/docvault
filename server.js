import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import routes from './server/routes';

// Set up the express app
const app = express();


// compiler for webpack
const compiler = webpack(webpackConfig);

// Log requests to the console.
app.use(logger('dev'));

// import webpack into express server
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.path,
  noInfo: true,
}));
app.use(compression());
app.use(express.static(path.join(__dirname, '/client')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.Document(app);
routes.User(app);
routes.Role(app);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './client/index.html'))
);

export default app;
