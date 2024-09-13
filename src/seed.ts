import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.members.upsert({
    where: { code: 'M001' },
    update: {},
    create: {
      code: 'M001',
      name: 'Angga',
    },
  })

  await prisma.members.upsert({
    where: { code: 'M002' },
    update: {},
    create: {
      code: 'M002',
      name: 'Ferry',
    },
  })

  await prisma.members.upsert({
    where: { code: 'M003' },
    update: {},
    create: {
      code: 'M003',
      name: 'Putri',
    },
  })

  await prisma.books.upsert({
    where: { code: 'JK-45' },
    update: {},
    create: {
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1
    },
  })

  await prisma.books.upsert({
    where: { code: 'SHR-1' },
    update: {},
    create: {
      code: "SHR-1",
      title: "A Study in Scarlet",
      author: "Arthur Conan Doyle",
      stock: 1
    },
  })

  await prisma.books.upsert({
    where: { code: 'HOB-83' },
    update: {},
    create: {
      code: "HOB-83",
      title: "The Hobbit, or There and Back Again",
      author: "J.R.R. Tolkien",
      stock: 1
    },
  })

  await prisma.books.upsert({
    where: { code: 'NRN-7' },
    update: {},
    create: {
      code: "NRN-7",
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      stock: 1
    },
  })


}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })