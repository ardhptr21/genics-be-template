import { HTTPException } from '@/exceptions/http-exception';
import { HTTPResponse } from '@/libs/http';
import { LoginModel, RegisterModel } from '@/models/http/auth-model';
import {
  createUserFromRegister,
  findUserByEmail,
  isUserExists
} from '@/repositories/user-repository';
import { compareBcrypt, hashBcrypt } from '@/utils/crypto-utils';
import { signJWT } from '@/utils/jwt-utils';
import { StatusCodes } from 'http-status-codes';

export const registerService = async (payload: RegisterModel): Promise<HTTPResponse<any>> => {
  payload.password = await hashBcrypt(payload.password);
  const isExists = await isUserExists({ email: payload.email, username: payload.username });

  if (isExists) {
    throw new HTTPException(StatusCodes.CONFLICT, 'User already exists');
  }

  const { password: _, ...user } = await createUserFromRegister(payload);
  return new HTTPResponse()
    .withStatus(StatusCodes.CREATED)
    .withMessage('User registered successfully')
    .withData({ user });
};

export const loginService = async (payload: LoginModel): Promise<HTTPResponse<any>> => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const isPasswordMatch = await compareBcrypt(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const { password: _, ...userData } = user;

  const token = signJWT({ id: user.id, email: user.email });

  return new HTTPResponse().withStatus(StatusCodes.OK).withMessage('Login successful').withData({
    user: userData,
    token
  });
};
