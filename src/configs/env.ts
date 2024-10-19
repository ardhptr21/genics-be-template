import { envModelValidator } from '@/models/common/env-model';
import dotenv from 'dotenv';

dotenv.config();

const parsed = envModelValidator.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
