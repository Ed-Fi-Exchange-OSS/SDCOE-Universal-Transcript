import './env';
import './db';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import routes from './routes/index';
import json from './middlewares/json';

import logger, { logStream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json({ limit: '20mb' })); // increasing the default payload size which is '100kb' but we are converting the upload signatures to base64 such that it exceeds the default payload size.
app.use(errorHandler.bodyParser);
app.use(json);

// Static folder
app.use('/api', express.static('./public'));

// API Routes
app.use('/api', routes);

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection', err);

  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);

  process.exit(1);
});

export default app;
