import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    discordUserId: text("discord_user_id").notNull().unique(),
    name: text("name").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (users) => ({
    nameIdx: index("name_idx").on(users.name),
    discordUserIdIdx: index("discordUserId_idx").on(users.discordUserId),
  }),
);

export const checkins = sqliteTable(
  "checkins",
  {
    id: integer("id").primaryKey(),
    date: text("date").default(sql`CURRENT_DATE`),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    profile: text("profile").notNull(),
    todo: text("todo").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (checkins) => ({
    userIdIdx: index("userId_idx").on(checkins.userId),
  }),
);

export const eventsToCheckins = sqliteTable(
  "events_to_checkins",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id),
    checkinId: integer("checkin_id")
      .notNull()
      .references(() => checkins.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.checkinId] }),
  }),
);

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
