import { prisma } from "./prisma.js";

export const typeDefs = /* GraphQL */ `
  type Author {
    id: ID!
    name: String!
    email: String!
    bio: String
    createdAt: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    description: String
    publishedAt: String
    pages: Int!
    authorId: String!
    author: Author!
    createdAt: String!
  }

  type Query {
    authors: [Author!]!
    books: [Book!]!
    author(id: ID!): Author
    book(id: ID!): Book
  }

  type Mutation {
    createAuthor(name: String!, email: String!, bio: String): Author!
    createBook(title: String!, pages: Int!, authorId: String!, description: String): Book!
    deleteBook(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    authors: () => prisma.author.findMany({ include: { books: true } }),
    books: () => prisma.book.findMany({ include: { author: true } }),
    author: (_: any, args: { id: string }) =>
      prisma.author.findUnique({ where: { id: args.id }, include: { books: true } }),
    book: (_: any, args: { id: string }) =>
      prisma.book.findUnique({ where: { id: args.id }, include: { author: true } }),
  },
  Mutation: {
    createAuthor: (_: any, args: any) => prisma.author.create({ data: args }),
    createBook: (_: any, args: any) => prisma.book.create({ data: args }),
    deleteBook: async (_: any, args: { id: string }) => {
      await prisma.book.delete({ where: { id: args.id } });
      return true;
    },
  },
};