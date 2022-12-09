import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';
import routes from '../routes';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    compress: 'gzip',
    path: path.join(__dirname, '..', 'logs'),
  });

  app.use(
    morgan('combined', {
      skip: function (_req, res) {
        return res.statusCode < 400;
      },
      stream: accessLogStream,
    }),
  );

  app.disable('x-powered-by');

  app.use('/api', routes);
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(__dirname, '..', 'views'));
  return app;
};

export { createServer };
