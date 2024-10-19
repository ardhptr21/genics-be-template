import 'express-async-errors';
// !express-async-errors must be on top (before import express)
import express from 'express';

import {
  globalErrorMiddleware,
  notFoundMiddleware,
  reqLoggerMiddleware
} from '@/middlewares/base-middleware';

import cors from '@/configs/cors';
import auth from '@/http/auth-http';
import base from '@/http/base-http';

const app = express();

/**----------------------
 *    MIDDLEWARES
 *------------------------**/
app.use(express.json());
app.use(cors);
app.use(reqLoggerMiddleware);

/**----------------------
 *    ROUTES HANDLING
 *------------------------**/
app.use('/', base);
app.use('/auth', auth);

/**----------------------
 *    GLOBAL HANDLING
 *------------------------**/
app.use('/*', notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
