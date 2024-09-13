import { Members } from "@prisma/client";


export interface IMembersReturn extends Members {
  isPenaltized: boolean,
  borrowedBooksCount: number
}