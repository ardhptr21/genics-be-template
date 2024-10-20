import { HTTPException } from '@/exceptions/http-exception';
import { parseBearerToken } from '@/helpers/parser-helper';
import { findUserById } from '@/repositories/user-repository';
import { AuthJWTPayload, Middleware } from '@/types/common';
import { verifyJWT } from '@/utils/jwt-utils';
import { StatusCodes } from 'http-status-codes';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const mustAuthMiddleware: Middleware = async (req, _, next) => {
  if (!req.headers.authorization) throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Unauthorized');
  const token = parseBearerToken(req.headers.authorization);

  try {
    const payload: AuthJWTPayload = verifyJWT(token);
    const user = await findUserById(Number(payload.id));
    if (!user) throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Unauthorized: user not found');

    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Unauthorized: token expired');
    }

    if (err instanceof JsonWebTokenError) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Unauthorized: invalid token');
    }

    return next(err);
  }
};
