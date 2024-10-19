import app from './apps/api';
import { env } from './configs/env';
import { logger } from './libs/logger';

app.listen(env.APP_PORT, env.APP_HOST, () => {
  logger.info(`Server is running on http://${env.APP_HOST}:${env.APP_PORT}`);
});
