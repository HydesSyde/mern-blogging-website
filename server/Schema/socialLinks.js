import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
});
