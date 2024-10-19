import { logger } from '@/libs/logger';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: [
    {
      level: 'error',
      emit: 'event'
    }
  ]
});

db.$on('error', (e) => logger.error(e));

export default db;
