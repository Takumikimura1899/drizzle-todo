'use client';

import { createTodo } from '@/actions/todoActions';
import { Button } from '@/components/ui/button';
import { LoaderIcon, PlusCircleIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const CreateTodo = () => {
  return (
    <form action={createTodo}>
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className='gap-x-1'>
      {pending ? (
        <LoaderIcon className='animate-spin' />
      ) : (
        <>
          <PlusCircleIcon />
          追加
        </>
      )}
    </Button>
  );
};
