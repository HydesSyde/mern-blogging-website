import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("Missing Database string");

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
