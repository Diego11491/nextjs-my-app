'use client';
import React, { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createProduct } from "@/lib/actions";
import toast from 'react-hot-toast';

export default function CreateForm() {
  const [state, formAction] = React.useActionState(createProduct, {
    message: '',
  });
  const { pending } = useFormStatus();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    if (!modal) return;

    if (state.message.indexOf('Created product') === 0) {
      modal.close();
      ref.current?.reset();
      toast(state.message);
    } else if (state.message) {
      toast(state.message);
    }
  }, [state.message]);

  const openModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    modal?.close();
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={openModal}
      >
        Create Product
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold py-4">Create Product</h2>
          <form ref={ref} action={formAction}>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                className="input input-bordered w-full max-w-xs"
                required
                defaultValue="/images/shirt1-jpg"
              />
            </div>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="input input-bordered w-full max-w-xs"
                required
                defaultValue="1"
              />
            </div>
            <button className="btn btn-primary mr-3" type="submit" disabled={pending}>
              Create
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
            >
              Back
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
