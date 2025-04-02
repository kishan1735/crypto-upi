import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string);
const db = drizzle({ client: migrationClient });

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  migrationClient.end();
};

main();
