import { getTodos } from '@/actions/todoActions';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateTodo } from './create-todo';

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
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell>{todo.createdAt.toDateString()}</TableCell>
              <TableCell>{todo.updatedAt.toDateString()}</TableCell>
              <TableCell className='w-1/6 space-x-2'>
                <Button variant='outline'>編集</Button>
                <Button variant='destructive'>削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
