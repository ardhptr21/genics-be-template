import { NextFunction, Request, Response } from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type AuthJWTPayload = {
  id: string;
  email: string;
  role: string;
};
