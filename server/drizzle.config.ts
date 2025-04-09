import { defineConfig } from "drizzle-kit";
import env from "./src/config/environment";

export default defineConfig({
  schema: "./src/config/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: false,
  strict: true,
});
