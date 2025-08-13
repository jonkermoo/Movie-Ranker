import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  PORT: z.string().default("4000"),
  OMDB_KEY: z.string().min(1, "OMDB_KEY is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const _parsed = EnvSchema.safeParse(process.env);
if (!_parsed.success) {
  console.error("Invalid environment:", _parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = _parsed.data;
