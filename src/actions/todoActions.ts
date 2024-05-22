import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { cache } from 'react';

export const getTodos = cache(async () => {
  const res = await db.select().from(todo).orderBy(asc(todo.id));
  return res;
});
