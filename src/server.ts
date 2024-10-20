import app from './apps/api';
import { env } from './configs/env';
import { logger } from './libs/logger';

const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
  logger.info(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`);
});

// Graceful shutdown
const onCloseSignal = () => {
  logger.warn('Server is shutting down...');
  server.close(() => {
    logger.info('Server is shutdown');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
