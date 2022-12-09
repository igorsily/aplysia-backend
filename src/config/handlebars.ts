import * as handlebarsHelpers from '@helpers/handlebarsHelpers';

import { create } from 'express-handlebars';
import path from 'path';
const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

export default {
  viewEngine: create({
    layoutsDir: viewPath,
    partialsDir: path.resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    extname: '.hbs',
    helpers: handlebarsHelpers,
  }),
  viewPath,
  extName: '.hbs',
};
