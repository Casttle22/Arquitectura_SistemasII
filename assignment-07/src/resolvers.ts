import type { PrismaClient } from "@prisma/client";

export const resolvers = (prisma: PrismaClient) => ({
  Query: {
    authors: () => prisma.author.findMany(),
    author: (_: unknown, args: { id: string }) =>
      prisma.author.findUnique({ where: { id: args.id } }),
    books: () => prisma.book.findMany(),
    book: (_: unknown, args: { id: string }) =>
      prisma.book.findUnique({ where: { id: args.id } })
  },

  Mutation: {
    createAuthor: (_: unknown, args: { name: string; bio?: string }) =>
      prisma.author.create({ data: { name: args.name, bio: args.bio } }),

    createBook: (
      _: unknown,
      args: { title: string; genre: string; publishedYear?: number; authorId: string }
    ) =>
      prisma.book.create({
        data: {
          title: args.title,
          genre: args.genre,
          publishedYear: args.publishedYear,
          authorId: args.authorId
        }
      })
  },

  Author: {
    books: (parent: { id: string }) =>
      prisma.book.findMany({ where: { authorId: parent.id } })
  },

  Book: {
    author: (parent: { authorId: string }) =>
      prisma.author.findUnique({ where: { id: parent.authorId } })
  }
});