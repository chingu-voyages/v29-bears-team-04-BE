import express from 'express';
import cors from 'cors';

const app = express();

const main = async() => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );
  app.get('/', ( _, res) => {
    res.send("Hello World");
  })
  app.listen(4000, () => {
    console.log('listening on port 4000')
  })
};

main().catch((err) => {
  console.log(`ERROR: ${err}`)
});