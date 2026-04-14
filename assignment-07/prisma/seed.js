import "dotenv/config";
import { prisma } from "../src/prisma.js";
async function main() {
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    const a1 = await prisma.author.create({
        data: { name: "Gabriel García Márquez", bio: "Realismo mágico" },
    });
    const a2 = await prisma.author.create({
        data: { name: "Isabel Allende", bio: "Novela contemporánea" },
    });
    await prisma.book.createMany({
        data: [
            { title: "Cien años de soledad", genre: "Novela", publishedYear: 1967, authorId: a1.id },
            { title: "La casa de los espíritus", genre: "Novela", publishedYear: 1982, authorId: a2.id },
        ],
    });
    console.log("Seed listo: 2 autores + 2 libros");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map