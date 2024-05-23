'use server';
import { db } from '@/db/drizzle';
import { insertTodoSchema, todo } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
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

export const updateTodo = cache(
  async (id: number, updateTodo: typeof todo.$inferInsert) => {
    const title = updateTodo.title;
    const status = updateTodo.status;
    if (!title || !status) return;
    const newTodo = insertTodoSchema.parse({
      title: title,
      status: status,
    });
    try {
      await db.update(todo).set(newTodo).where(eq(todo.id, id));
      revalidatePath('/');
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTodo = cache(async (id: number) => {
  try {
    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
});
