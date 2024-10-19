import { HTTPException } from '@/exceptions/http-exception';
import { handleHTTPResponse, HTTPResponse } from '@/libs/http';
import { logger } from '@/libs/logger';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export const reqLoggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} - ${req.url} (${req.ip})`);
  next();
};

export const notFoundMiddleware = (_: Request, res: Response) => {
  const httpResponse = new HTTPResponse()
    .withStatus(StatusCodes.NOT_FOUND)
    .withMessage('Route not found.');
  return handleHTTPResponse(res, httpResponse);
};

export const globalErrorMiddleware = (
  err: unknown,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(err);

  if (err instanceof Error) {
    logger.error(err.message, err);
  }

  let httpResponse: HTTPResponse<any>;

  if (err instanceof HTTPException) {
    httpResponse = new HTTPResponse()
      .withStatus(err.status)
      .withMessage(err.message)
      .withError(err.error);
  } else if (err instanceof ZodError) {
    httpResponse = new HTTPResponse()
      .withMessage('Payload provided is not valid.')
      .withError({ issues: err.errors })
      .withStatus(StatusCodes.BAD_REQUEST);
  } else {
    httpResponse = new HTTPResponse()
      .withMessage('Internal server error.')
      .withStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return handleHTTPResponse(res, httpResponse);
};
