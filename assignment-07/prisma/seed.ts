import "dotenv/config";
import { prisma } from "../src/prisma.js";

async function ensureAuthor(name: string, bio: string) {
  const existing = await prisma.author.findFirst({ where: { name } });
  if (existing) return existing;

  return prisma.author.create({
    data: { name, bio },
  });
}

async function ensureBook(params: {
  title: string;
  genre: string;
  publishedYear: number;
  authorId: number;
}) {
  const existing = await prisma.book.findFirst({
    where: { title: params.title, authorId: params.authorId },
  });
  if (existing) return existing;

  return prisma.book.create({ data: params });
}

async function main() {
  const a1 = await ensureAuthor("Gabriel García Márquez", "Realismo mágico");
  const a2 = await ensureAuthor("Isabel Allende", "Novela contemporánea");

  await ensureBook({
    title: "Cien años de soledad",
    genre: "Novela",
    publishedYear: 1967,
    authorId: a1.id,
  });

  await ensureBook({
    title: "La casa de los espíritus",
    genre: "Novela",
    publishedYear: 1982,
    authorId: a2.id,
  });

  console.log("Seed OK: autores/libros asegurados (sin borrar).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });