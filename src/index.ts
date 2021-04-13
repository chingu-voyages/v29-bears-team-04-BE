import express from 'express';
import cors from 'cors';
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();

const main = async() => {
  app.use(express.json())
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );

  app.get('/', (_, res) => {
    res.send("connected")
  });
  
  app.post('/register', async (req, res): Promise<User> => {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
    res.send(newUser);
    return newUser;
  });
  
  app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000')
  })
};

main().catch((err) => {
  console.log(`ERROR: ${err}`)
}).finally(async () => {
  await prisma.$disconnect()
});