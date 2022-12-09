import pino from 'pino';

const LoggerWrapper = () => {
  return pino({
    transport: {
      target: 'pino-pretty',
    },
  });
};

export const logger = LoggerWrapper();
