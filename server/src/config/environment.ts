import { z } from "zod";
import "dotenv/config";

const serverSchema = z.object({
  SERVER_PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string().nonempty(),
  FRONTEND_URL: z.string().nonempty(),
  SPECK_KEY: z.string().nonempty(),
});

const parsed = serverSchema.parse(process.env);

export default parsed;
