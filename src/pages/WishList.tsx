import React from "react";
import { useAppSelector } from "../app/hooks";
import {
  useDeleteWishListMutation,
  useGetWishListSingleWishListQuery,
  useUpdateWishListMutation,
} from "../app/features/wishList/wishListApiSlice";
import Loading from "../components/shared/Loading";
import { toast } from "react-hot-toast";

type WishListProps = {
  _id: string;
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
};

const WishList: React.FC = () => {
  const { data: user } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetWishListSingleWishListQuery(
    user?.email || ""
  );

  const [deleteWishList, { isLoading: updateLoading, error: updateError }] =
    useDeleteWishListMutation();

  const deleteHandler = (id: string): void => {
    toast.promise(deleteWishList(id), {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error deleting",
    });

    deleteWishList(id);
  };

  let content;

  if (isLoading || updateLoading) {
    content = <Loading />;
  }

  if ((!isLoading && error) || updateError) {
    content = <div>{(error || updateError) as string} </div>;
  }

  // wish list content is empty then show error message
  if (data?.data.length === 0) {
    content = <div className="text-center">Wish list is empty</div>;
  }

  if (!isLoading && !error && data?.data.length > 0) {
    content = data?.data.map((book: WishListProps) => (
      <div className="grid grid-cols-3 gap-5  place-items-center">
        <div>{book.bookId?.title}</div>
        <div>{book.bookId?.author}</div>
        <div
          onClick={() => deleteHandler(book._id)}
          className={`rounded uppercase px-5 py-1 cursor-pointer  ${"bg-red-500 text-white"}`}
        >
          delete
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
              <div className="grid grid-cols-3 gap-5  place-items-center">
                <div>Title</div>
                <div>Author</div>
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
export default WishList;
