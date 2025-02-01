import { relations, sql } from "drizzle-orm";
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

export const checkouts = sqliteTable(
  "checkouts",
  {
    id: integer("id").primaryKey(),
    date: text("date").default(sql`CURRENT_DATE`),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (checkouts) => ({
    userIdIdx: index("checkouts_userId_idx").on(checkouts.userId),
  }),
);

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  checkins: many(checkins),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  eventsToCheckins: many(eventsToCheckins),
}));

export const checkinsRelations = relations(checkins, ({ many }) => ({
  eventsToCheckins: many(eventsToCheckins),
}));

export const eventsToCheckinsRelations = relations(
  eventsToCheckins,
  ({ one }) => ({
    event: one(events, {
      fields: [eventsToCheckins.eventId],
      references: [events.id],
    }),
    checkin: one(checkins, {
      fields: [eventsToCheckins.checkinId],
      references: [checkins.id],
    }),
  }),
);

export const checkoutsRelations = relations(checkouts, ({ one }) => ({
  checkin: one(checkins, {
    fields: [checkouts.userId],
    references: [checkins.userId],
  }),
}));
