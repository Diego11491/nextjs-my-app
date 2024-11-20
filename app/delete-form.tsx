'use client';

import { deleteProduct } from '@/lib/actions';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

export default function DeleteForm({
  _id,
  name,
}: {
  _id: string;
  name: string;
}) {
  const { pending } = useFormStatus();

  const handleSubmit = async (formData: FormData) => {
    const res = await deleteProduct(formData);
    toast(res.message);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      handleSubmit(formData);
    }}>
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="name" value={name} />
      <button type="submit" disabled={pending} className="btn btn-ghost">
        Delete
      </button>
    </form>
  );
}
