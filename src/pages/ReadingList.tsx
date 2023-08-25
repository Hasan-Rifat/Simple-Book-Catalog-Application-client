import React from "react";
import { useAppSelector } from "../app/hooks";
import {
  useGetReadingListSingleReadingListQuery,
  useUpdateReadingListMutation,
} from "../app/features/readingList/readingListApiSlice";
import Loading from "../components/shared/Loading";
import { toast } from "react-hot-toast";

interface redingListItem {
  _id: string;
  status: boolean;
  bookId: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: string[];
    email: string;
    __v: number;
  };
  email: string;
  __v: number;
}

const ReadingList: React.FC = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetReadingListSingleReadingListQuery(
    user?.email || ""
  );

  console.log(data?.data);

  const [updateReadingList, { isLoading: updateLoading, error: updateError }] =
    useUpdateReadingListMutation();

  const markDownHandler = (id: string, bookId: string): void => {
    toast.promise(updateReadingList(id), {
      loading: "loading...",
      success: "Marked down successfully",
      error: "Error deleting",
    });

    updateReadingList({
      status: true,
      id: id,
      bookId,
      email: user?.email,
    });
  };

  let content;

  if (isLoading || updateLoading) {
    content = <Loading />;
  }

  if ((!isLoading && error) || updateError) {
    content = <div>{(error || updateError) as string} </div>;
  }

  if (!isLoading && !error && data.data.length === 0) {
    content = <div>No book in reading list</div>;
  }

  if (!isLoading && !error && data.data.length > 0) {
    content = data?.data.map((book: redingListItem) => (
      <div className="grid grid-cols-5 gap-5  place-items-center">
        <div>{book._id}</div>
        <div>{book.bookId?.title}</div>
        <div>{book.bookId?.author}</div>
        <div
          className={`text-[#0f1729] px-4 py-1 rounded font-medium ${
            book.status ? "bg-[#2bd4bd]" : "bg-[#fb6f84]"
          }`}
        >
          {book.status ? "Done" : "Not yet"}
        </div>
        <div>
          {book.status === true ? (
            <span className=" text-black ">Mark down</span>
          ) : (
            <button
              onClick={() => markDownHandler(book._id, book.bookId._id)}
              className={`bg-black text-white rounded uppercase px-5 py-1 cursor-pointer`}
            >
              Mark down
            </button>
          )}
        </div>
      </div>
    ));
  }

  return (
    <section className="h-[100vh]">
      <div className="max-w-[1200px] mx-auto ">
        <div>
          <div className="shadow-2xl rounded-lg mt-10">
            <div className="bg-black text-white font-bold p-5">
              <div className="grid grid-cols-4 gap-5  place-items-center">
                <div>Title</div>
                <div>Author</div>
                <div>Status</div>
                <div>Action</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5">{content}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ReadingList;
