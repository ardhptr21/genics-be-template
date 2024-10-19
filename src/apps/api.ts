import base from '@/http/base-http';
import { globalErrorMiddleware, notFoundMiddleware } from '@/middlewares/base-middleware';
import express from 'express';

const app = express();

app.use(express.json());

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
