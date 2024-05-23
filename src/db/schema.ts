import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const statusEnum = pgEnum('status', [
  'notStarted',
  'imProgress',
  'completed',
]);

export const todo = pgTable('todo', {
  id: serial('id').primaryKey().notNull(),
  title: text('title').notNull(),
  status: statusEnum('status').default('notStarted').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const insertTodoSchema = createInsertSchema(todo);
export const updateTodoSchema = createInsertSchema(todo).pick({
  title: true,
  status: true,
});
