import { envSchemaValidator } from '@/validators/common/env-validator';
import dotenv from 'dotenv';

dotenv.config();

const parsed = envSchemaValidator.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
