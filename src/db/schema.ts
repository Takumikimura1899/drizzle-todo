import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'notStarted',
  'imProgress',
  'completed',
]);

export const todo = pgTable('todo', {
  id: serial('id').notNull().primaryKey(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull().default('notStarted'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
