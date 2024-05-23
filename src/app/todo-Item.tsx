'use client';

import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { todo, updateTodoSchema } from '@/db/schema';
import { DeleteTodo } from './delete-todo';
import { useState } from 'react';
import { updateTodo } from '@/actions/todoActions';
import { z } from 'zod';
import { Pen, RefreshCcw, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from '@formkit/tempo';

export const TodoItem = ({
  id,
  title,
  status,
  createdAt,
  updatedAt,
}: typeof todo.$inferSelect) => {
  const initialTodo = { title, status };
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState<z.infer<typeof updateTodoSchema>>({
    title,
    status,
  });

  const handleEdit = () => {
    setNewTodo({ title, status });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!newTodo) return;
    console.log(newTodo);
    await updateTodo(id, newTodo);
    setIsEditing(false);
  };

  const handleReset = () => {
    setNewTodo(initialTodo);
    setIsEditing(false);
  };

  return (
    <TableRow className={cn(isEditing && 'bg-teal-100 hover:bg-teal-100')}>
      <TableCell className='min-w-32 max-w-32'>
        {isEditing ? (
          <Input
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        ) : (
          newTodo.title
        )}
      </TableCell>
      <TableCell className='min-w-32 max-w-32'>
        {isEditing ? (
          <Select
            value={newTodo.status}
            onValueChange={(e) =>
              setNewTodo((prev) =>
                updateTodoSchema.parse({
                  ...prev,
                  status: e,
                })
              )
            }
          >
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='notStarted'>notStarted</SelectItem>
              <SelectItem value='imProgress'>imProgress</SelectItem>
              <SelectItem value='completed'>completed</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          newTodo.status
        )}
      </TableCell>
      <TableCell className='min-w-32 max-w-32'>
        {format(createdAt, 'YY/MM/DD HH:mm:ss')}
      </TableCell>
      <TableCell className='min-w-32 max-w-32'>
        {format(updatedAt, 'YY/MM/DD HH:mm:ss')}
      </TableCell>
      <TableCell className='flex space-x-2 min-w-32 max-w-32'>
        {isEditing ? (
          <Button className='gap-1' variant='outline' onClick={handleUpdate}>
            <Upload />
            更新
          </Button>
        ) : (
          <Button className='gap-1' variant='outline' onClick={handleEdit}>
            <Pen />
            編集
          </Button>
        )}
        {isEditing ? (
          <Button className='gap-1' variant='destructive' onClick={handleReset}>
            <RefreshCcw />
            リセット
          </Button>
        ) : (
          <DeleteTodo id={id} />
        )}
      </TableCell>
    </TableRow>
  );
};
