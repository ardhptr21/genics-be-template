import { z } from 'zod';

const envSchema = z.object({
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
   *    DATABASE ENV
   *------------------------**/
  DB_URL: z.string().trim()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
