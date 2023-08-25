import React from "react";
import { useForm } from "react-hook-form";
import {
  useGetBookSingleBookQuery,
  useUpdateBookMutation,
} from "../app/features/book/bookApiSlice";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue } = useForm();

  const [updateBook, { error: updateBookError }] = useUpdateBookMutation();

  const { data, isLoading, error } = useGetBookSingleBookQuery(id);

  if ((!isLoading && error) || updateBookError) {
    toast.error((error || updateBookError) as string, {
      id: "update-book-error",
    });
  }

  React.useEffect(() => {
    if (data) {
      setValue("title", data.data.title);
      setValue("author", data.data.author);
      setValue("genre", data.data.genre);
      setValue("publicationDate", data.data.publicationDate);
      setValue("email", data.data.email);
    }
  }, [data, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      const body = {
        id,
        ...formData,
      };

      await updateBook(body);
      toast.success("Book Update successfully!", {
        id: "update-book-success",
      });
    } catch (error) {
      toast.error("An error occurred while updating the book.", {
        id: "update-book-error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Update a Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              {...register("author")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block font-medium mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              {...register("genre")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publicationDate" className="block font-medium mb-1">
              Publication Date
            </label>
            <input
              type="date"
              id="publicationDate"
              {...register("publicationDate")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
