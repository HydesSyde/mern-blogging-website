import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  receiverId: integer("receiver_id")
    .references(() => users.id)
    .notNull(),

  senderId: integer("sender_id")
    .references(() => users.id)
    .notNull(),

  message: text("message").notNull(),

  isRead: boolean("is_read").default(false),

  createdAt: timestamp("created_at").defaultNow(),
});
