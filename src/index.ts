import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import UserRoutes from './routes/users';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from './constants';

export const prisma = new PrismaClient();
const app = express();

const main = async() => {
  // Redis:
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  // Body Parser:
  app.use(express.json());
  // Cors Config:
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );
  // Express session config:
  app.set("trust proxy", 1);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
        // httpOnly: true,
        // sameSite: 'lax',
        // secure: __prod__,
        // domain: __prod__ ? ".herokuapp.com" : undefined,
      },
      secret: (process.env.SESSION_SECRET as string),
      resave: false,
      saveUninitialized: false,
    })
  )
  // **** ROUTES: **** 
  app.get('/', (_, res) => {
    res.send("connected")
  });
  
  app.use('/users', UserRoutes);
  
  // Server:
  app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000')
  })
};

main().catch((err) => {
  console.log(`ERROR: ${err}`)
}).finally(async () => {
  await prisma.$disconnect()
});