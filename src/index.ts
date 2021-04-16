import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import UserRoutes from './routes/users'

export const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const main = async() => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );

  app.get('/', (_, res) => {
    res.send("connected")
  });
  
  app.use('/users', UserRoutes);
  
  app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000')
  })
};

main().catch((err) => {
  console.log(`ERROR: ${err}`)
}).finally(async () => {
  await prisma.$disconnect()
});