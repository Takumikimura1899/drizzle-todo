import { getTodos } from '@/actions/todoActions';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateTodo } from './create-todo';
import { TodoItem } from './todo-Item';

export default async function Home() {
  const todos = await getTodos();
  return (
    <main>
      <h1 className='text-center text-3xl'>drizzle todo</h1>
      <Table>
        <TableCaption>Todo List</TableCaption>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead>タイトル</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>作成日</TableHead>
            <TableHead>更新日</TableHead>
            <TableHead>
              <CreateTodo />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
