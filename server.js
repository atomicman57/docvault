import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

require('dotenv').config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes.Document(app);
routes.User(app);
routes.Role(app);
export default app;
