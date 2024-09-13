import dotenv from 'dotenv'
import express from 'express';
import server from './server';
import prisma from './infrastructures/client';

dotenv.config();
const prismaClient = prisma;

(async () => {

  const apiRouter = express();
  const v1Router = express();

  server.use('/api', apiRouter);
  apiRouter.use('/v1', v1Router);

  server.listen(process.env.APP_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
  });
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // Logger.error(e);
    console.log(e); 
    await prisma.$disconnect();
    process.exit(1);
  });
