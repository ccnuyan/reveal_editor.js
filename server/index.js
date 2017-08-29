import 'babel-polyfill';

import express from 'express';
import path from 'path';
import compression from 'compression';

import EditorPage from './middlewares/EditorPage';

const app = express();
/* eslint-disable no-console */

const PORT = process.env.PORT || 10000;

try {
  (async () => {
    app.use(compression());
    app.use('/static/', express.static(path.join(__dirname, '../build/')));
    app.use('/static/', express.static(path.join(__dirname, '../public/')));
    app.get('/', EditorPage);
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`app is listening on port ${PORT}`);
      }
    });
  })();
} catch (err) {
  console.log(err);
}
