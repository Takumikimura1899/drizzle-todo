'use client';

import { deleteTodo } from '@/actions/todoActions';
import { Button } from '@/components/ui/button';
import { LoaderIcon, TrashIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const DeleteTodo = ({ id }: { id: number }) => {
  const deleteAction = deleteTodo.bind(null, id);
  return (
    <form action={deleteAction}>
      <SubmitButton />
    </form>
  );
};

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      variant='destructive'
      disabled={pending}
      className='gap-x-1'
    >
      {pending ? (
        <LoaderIcon className='animate-spin' />
      ) : (
        <>
          <TrashIcon />
          削除
        </>
      )}
    </Button>
  );
};
