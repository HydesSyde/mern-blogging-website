import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullname: varchar("full_name", { length: 50 }).notNull(),

  email: varchar("email", { length: 50 }).notNull().unique(),

  password: text("password").notNull(),

  username: varchar("user_name", { length: 100 }).notNull().unique(),

  bio: varchar("bio", { length: 255 }).default(""),

  profileImg: text("profile_img").notNull(),

  googleAuth: boolean("google_auth").default(false),

  totalPosts: integer("total_posts").default(0),

  totalReads: integer("total_reads").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});
