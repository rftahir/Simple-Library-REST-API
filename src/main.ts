import dotenv from "dotenv";
import express from "express";
import server from "./server";
import prisma from "./infrastructures/prisma/client";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';
import MembersRouter from "./presentations/routers/members/members";
import { MembersRepository } from "./domain/repositories/members/members";
import { MembersUseCase } from "./domain/use-cases/members/members";
import { BorrowBooksRepository } from "./domain/repositories/borrowBooks/borrowBooks";

dotenv.config();
const prismaClient = prisma;

(async () => {
  // Repository Initializations
  const membersRepository = new MembersRepository(prisma);
  const borrowBooksRepository = new BorrowBooksRepository(prisma);

  // Usecase Initializations
  const membersUseCase = new MembersUseCase(
    membersRepository,
    borrowBooksRepository
  );

  const apiRouter = express();
  const v1Router = express();
  server.use("/api", apiRouter);
  apiRouter.use("/v1", v1Router);


  const membersRouter = MembersRouter(membersUseCase);
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  v1Router.use("/members", membersRouter);

  server.listen(process.env.APP_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
    console.log(`API docs available at http://localhost:${process.env.APP_PORT}/docs`);
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
