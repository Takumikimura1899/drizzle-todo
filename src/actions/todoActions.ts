'use server';
import { db } from '@/db/drizzle';
import { insertTodoSchema, todo } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

export const getTodos = cache(async () => {
  const res = await db.select().from(todo).orderBy(asc(todo.id));
  return res;
});

export const createTodo = cache(async (formData: FormData) => {
  const newTodo = insertTodoSchema.parse({
    title: formData.get('title') || '新規作成',
  });
  try {
    await db.insert(todo).values(newTodo);
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
});
