import express from 'express';
import path from 'path';
import compression from 'compression';
import delay from 'express-delay';


import './globals';
import config from '../config';
import EditorPage from './middlewares/EditorPage';

const app = express();
/* eslint-disable no-console */

const PORT = process.env.PORT || config.port;

global.report();

try {
  (async () => {
    if (config.mode === 'development') {
      app.use(delay(200, 500));
    } else {
      app.use(compression());
    }

    app.use('/static/', express.static(path.join(__dirname, '../build/')));
    app.use('/static/', express.static(path.join(__dirname, '../public/')));

    app.get('/', EditorPage);
    app.listen(PORT, (err) => {
      if (err) {
        printError(err, __filename);
      } else {
        printMessage(`editor is listening on port ${PORT}`, __filename);
      }
    });
  })();
} catch (err) {
  console.log(err);
}
