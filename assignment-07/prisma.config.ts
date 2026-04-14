import "dotenv/config";
import { defineConfig } from "prisma/config";

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) throw new Error("Falta DIRECT_URL o DATABASE_URL en .env");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url },
});