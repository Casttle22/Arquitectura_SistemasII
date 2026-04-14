import type { PrismaClient } from "@prisma/client";

const toInt = (value: string) => {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) throw new Error("ID inválido");
  return n;
};

export const resolvers = (prisma: PrismaClient) => ({
  Query: {
    authors: () => prisma.author.findMany({ include: { books: true } }),
    author: (_: unknown, args: { id: string }) =>
      prisma.author.findUnique({
        where: { id: toInt(args.id) },
        include: { books: true },
      }),

    books: () => prisma.book.findMany({ include: { author: true } }),
    book: (_: unknown, args: { id: string }) =>
      prisma.book.findUnique({
        where: { id: toInt(args.id) },
        include: { author: true },
      }),
  },

  Mutation: {
    createAuthor: (_: unknown, args: { name: string; bio?: string }) =>
      prisma.author.create({
        data: {
          name: args.name,
          bio: args.bio ?? "", // si en Prisma bio es required
        },
      }),

    createBook: (
      _: unknown,
      args: { title: string; genre: string; publishedYear?: number; authorId: string }
    ) =>
      prisma.book.create({
        data: {
          title: args.title,
          genre: args.genre,
          publishedYear: args.publishedYear ?? new Date().getFullYear(),
          authorId: toInt(args.authorId),
        },
      }),
  },

  Author: {
    books: (parent: { id: number }) =>
      prisma.book.findMany({ where: { authorId: parent.id } }),
  },

  Book: {
    author: (parent: { authorId: number }) =>
      prisma.author.findUnique({ where: { id: parent.authorId } }),
  },
});