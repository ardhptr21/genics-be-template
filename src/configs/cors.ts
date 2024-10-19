import cors, { CorsOptions } from 'cors';
import { env } from './env';

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin || env.CORS_ORIGIN.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Content-Length', 'Accept-Encoding', 'Authorization'],
  exposedHeaders: ['Content-Length']
};

export default cors(corsOptions);
