import {
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  username: text("user_name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  image: varchar("image"),
});

export const cart = pgTable("cart", {
  id: varchar("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  userId: varchar("user_id").notNull(),
  items: json("items").$type<CartItem[]>(),
});
