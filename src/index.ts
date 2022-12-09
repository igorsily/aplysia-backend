import { createServer } from '@config/express';
import { logger } from '@config/logger';
import http from 'http';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

(async () => {
  const app = createServer();
  const server = http.createServer(app);

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);
      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });

  server.listen({ host, port }, () => {
    logger.info(`Server ready at ${port}`);
  });
})();
