import db from '@/externals/db';
import { RegisterModel } from '@/models/http/auth-model';

export const createUserFromRegister = async (payload: RegisterModel) => {
  return await db.user.create({ data: payload });
};

export const findUserByEmail = async (email: string) => {
  return await db.user.findFirst({ where: { email } });
};

export const isUserExists = async (criteria: { email?: string; username?: string }) => {
  return (
    (await db.user.count({
      where: {
        OR: [{ email: criteria.email }, { username: criteria.username }]
      }
    })) > 0
  );
};

export const findUserById = async (id: number) => {
  return await db.user.findFirst({ where: { id } });
};
