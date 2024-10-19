import { z } from 'zod';

export const registerModelValidator = z.object({
  name: z.string().trim().min(3).max(200),
  username: z
    .string()
    .trim()
    .min(3)
    .max(200)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscore'
    }),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginModelValidator = z.object({
  email: z.string().email(),
  password: z.string()
});

export type RegisterModel = z.infer<typeof registerModelValidator>;
export type LoginModel = z.infer<typeof loginModelValidator>;
