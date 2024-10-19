import { compare, genSalt, hash } from 'bcrypt';

export const hashBcrypt = async (str: string) => {
  const salt = await genSalt(10);
  return await hash(str, salt);
};

export const compareBcrypt = async (str: string, hash: string) => {
  return await compare(str, hash);
};
