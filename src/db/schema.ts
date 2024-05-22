import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const statusEnum = pgEnum('status', [
  'notStarted',
  'imProgress',
  'completed',
]);

export const todo = pgTable('todo', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull().default('notStarted'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertTodoSchema = createInsertSchema(todo);
