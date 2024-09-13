import { Books } from "@prisma/client";

export const mockBooks: Books[] = [
  {
    id: 1,
    code: "JK-45",
    title: "Harry Potter",
    author: "J.K Rowling",
    stock: 1,
  },
  {
    id: 2,
    code: "SHR-1",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    stock: 1,
  },
  {
    id: 3,
    code: "TW-11",
    title: "Twilight",
    author: "Stephenie Meyer",
    stock: 1,
  },
  {
    id: 4,
    code: "HOB-83",
    title: "The Hobbit, or There and Back Again",
    author: "J.R.R. Tolkien",
    stock: 1,
  },
  {
    id: 5,
    code: "NRN-7",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    stock: 1,
  },
];
