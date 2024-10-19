import { z } from 'zod';

export const envModelValidator = z.object({
  /**----------------------
   *    APP BASE ENV
   *------------------------**/
  APP_NAME: z.string().trim().default('GENICS-BE'),
  APP_HOST: z.string().trim().default('localhost'),
  APP_PORT: z.coerce.number().default(Number(process.env.PORT) || 3000),

  /**----------------------
   *    DEBUGGING ENV
   *------------------------**/
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEBUG_LEVEL: z
    .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
    .default('info'),

  /**----------------------
   *    CORS ENV
   *------------------------**/
  CORS_ORIGIN: z
    .string()
    .default('*')
    .transform((val) => val.split(',')),

  /**----------------------
   *    DATABASE ENV
   *------------------------**/
  DB_URL: z.string().trim(),

  /**----------------------
   *    JWT ENV
   *------------------------**/
  JWT_SECRET: z.string().trim().min(16)
});
