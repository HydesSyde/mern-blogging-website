import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  youtube: text("youtube").default(""),
  instagram: text("instagram").default(""),
  facebook: text("facebook").default(""),
  twitter: text("twitter").default(""),
  github: text("github").default(""),
  website: text("website").default(""),
});
