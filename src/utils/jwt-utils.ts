import { env } from '@/configs/env';
import jwt from 'jsonwebtoken';

export const signJWT = (payload: any) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '2h' });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};
