import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validatePayloadMiddleware = <T>(
  schema: ZodSchema<T>,
  loc: 'body' | 'params' | 'query' = 'body'
) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const payload = req[loc];
      const data = await schema.parse(payload);
      req[loc] = data;
      next();
    } catch (err) {
      next(err);
    }
  };
};
