import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.js";
import { blogPosts } from "./blogPosts";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  blogId: integer("blod_id")
    .references(() => blogPosts.id)
    .notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
