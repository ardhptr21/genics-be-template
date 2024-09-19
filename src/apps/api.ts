import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HTTPException } from '../exceptions/http-exception';
import base from '../http/base.http';
import { HTTPResponse } from '../libs/http';
import { logger } from '../libs/logger';

const app = express();

app.use(express.json());

/**----------------------
 *    ROUTES HANDLING
 *------------------------**/
app.use('/', base);

/**----------------------
 *    GLOBAL ERROR HANDLING
 *------------------------**/
app.use((err: unknown, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  if (err instanceof Error) {
    logger.error(err.message, err);
  }

  if (err instanceof HTTPException) {
    return new HTTPResponse(res)
      .withStatus(err.status)
      .withMessage(err.message)
      .withError(err.error)
      .send();
  }

  if (err instanceof ZodError) {
    return new HTTPResponse(res)
      .withMessage('Payload provided is not valid.')
      .withError({ issues: err.errors })
      .withStatus(400)
      .send();
  }

  return new HTTPResponse(res).withMessage('Internal server error.').withStatus(500).send();
});
export default app;
