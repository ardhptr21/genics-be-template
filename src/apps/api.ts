import cors from '@/configs/cors';
import base from '@/http/base-http';
import {
  globalErrorMiddleware,
  notFoundMiddleware,
  reqLoggerMiddleware
} from '@/middlewares/base-middleware';
import express from 'express';

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

/**----------------------
 *    GLOBAL HANDLING
 *------------------------**/
app.use(notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
