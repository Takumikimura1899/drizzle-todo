import { getTodos } from '@/actions/todoActions';

export default async function Home() {
  const todos = await getTodos();
  return (
    <main>
      <h1 className='text-center text-3xl'>drizzle todo</h1>
      {todos.map((todo) => (
        <div key={todo.id} className=''>
          <span>{todo.title}</span>
          <span>{todo.status}</span>
        </div>
      ))}
    </main>
  );
}
