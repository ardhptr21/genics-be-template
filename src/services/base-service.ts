import { HTTPResponse } from '@/libs/http';

export const baseService = () => {
  return new HTTPResponse().withMessage('Hello World!');
};
