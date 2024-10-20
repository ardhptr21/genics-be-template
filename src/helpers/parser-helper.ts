import { HTTPException } from '@/exceptions/http-exception';
import { StatusCodes } from 'http-status-codes';

export const parseBearerToken = (authorization: string): string => {
  const candidate = authorization.split(' ');
  if (candidate.length !== 2)
    throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Invalid authorization header.');

  const [bearer, token] = candidate;
  if (bearer !== 'Bearer')
    throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Invalid authorization header.');

  return token;
};
