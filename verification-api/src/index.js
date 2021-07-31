require('./env');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const routes = require('./routes');
const json = require('./middlewares/json');
const { logger, logStream } = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '6000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

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

module.exports = app;
