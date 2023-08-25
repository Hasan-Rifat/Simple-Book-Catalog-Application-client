import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetBookSingleBookQuery,
  useUpdateBookMutation,
} from "../app/features/book/bookApiSlice";
import Loading from "../components/shared/Loading";
import { FiSend } from "react-icons/fi";
import { useAppSelector } from "../app/hooks";
import { toast } from "react-hot-toast";

type BookDetailsProps = {};

const BookDetails: React.FC<BookDetailsProps> = () => {
  const { data: user } = useAppSelector((state) => state.user);

  const [inputValue, setInputValue] = useState<string>("");

  const { id } = useParams();
  const { isLoading, data, error } = useGetBookSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const [updateBook, { isLoading: isUpdateLoading, error: updateError }] =
    useUpdateBookMutation();

  let content;
  if (isLoading || isUpdateLoading) {
    content = <Loading />;
  }
  if (!isLoading && error && updateError) {
    content = <div>{(error || updateError) as string} </div>;
  }
  if (!isLoading && !error && data?.data) {
    content = (
      <div className="p-10 shadow-xl">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          genre: {data?.data?.genre}
        </h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
          title: {data?.data?.title}
        </h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">author: {data?.data.author}</p>
        <div className="flex mt-6 items-center pb-5  border-gray-100 mb-5">
          Publication Date: {data?.data?.publicationDate}
        </div>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const options = [...data?.data?.reviews, inputValue];

    updateBook({
      id: id,
      reviews: options,
      email: user?.email,
    });
    toast.success("Comment added", {
      id: "add-comment",
    });
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden h-[85vh]">
      <div className="max-w-[1200px] px-5 py-24 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/300x100"
          />
          <div className="lg:w-1/2 w-full  mt-6 lg:mt-0">{content}</div>
        </div>
        <div className="my-10">
          <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
            <textarea
              className="min-h-[30px]  flex  w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'"
              onChange={handleChange}
              placeholder="Add a comment"
              value={inputValue}
            />
            <button
              type="submit"
              className="rounded-full h-10 w-10 p-2 text-[25px] inline-flex items-center justify-center bg-indigo-700 text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
            >
              <FiSend />
            </button>
          </form>
        </div>

        <div className="mt-10 shadow-xl p-5 rounded-xl">
          {data?.data?.reviews?.map((comment: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5 p-2">
              <div>
                <img
                  className="w-10 rounded-full"
                  src="https://github.com/shadcn.png"
                />
              </div>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BookDetails;
