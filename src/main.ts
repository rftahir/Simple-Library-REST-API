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
import { BooksRepository } from "./domain/repositories/books/books";
import { BooksUseCase } from "./domain/use-cases/books/books";
import BooksRouter from "./presentations/routers/books/books";
import { BorrowBooksUseCase } from "./domain/use-cases/borrowBooks/borrowBooks";
import BorrowBooksRouter from "./presentations/routers/borrowBooks/borrowBooks";

dotenv.config();
const prismaClient = prisma;

(async () => {
  // Repository Initializations
  const membersRepository = new MembersRepository(prisma);
  const booksRepository = new BooksRepository(prisma);
  const borrowBooksRepository = new BorrowBooksRepository(prisma);

  // Usecase Initializations
  const membersUseCase = new MembersUseCase(
    membersRepository,
    borrowBooksRepository
  );

  const booksUseCase = new BooksUseCase(
    booksRepository
  )

  const borrowBookUseCase = new BorrowBooksUseCase(
    borrowBooksRepository,
    booksRepository,
    membersRepository,
    prisma
  )

  const v1Router = express();
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  server.use("/v1", v1Router);

  const membersRouter = MembersRouter(membersUseCase);
  const booksRouter = BooksRouter(booksUseCase);
  const borrowBookRouter = BorrowBooksRouter(borrowBookUseCase);

  v1Router.use("/members", membersRouter);
  v1Router.use("/books", booksRouter);
  v1Router.use("/borrow-books", borrowBookRouter);

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
