import { AiFillRead, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IBook } from "../../types/type";
import Loading from "../shared/Loading";
import { toast } from "react-hot-toast";
import { useCreateReadingListMutation } from "../../app/features/readingList/readingListApiSlice";
import { useCreateWishListMutation } from "../../app/features/wishList/wishListApiSlice";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../../app/features/book/bookApiSlice";
import { useAppSelector } from "../../app/hooks";
import { BiSolidMessageEdit } from "react-icons/bi";
import SearchAndFilter from "../shared/SearchAndFilter";
import { MdDeleteForever } from "react-icons/md";

const AllBookComponent: React.FC = () => {
  const { searchValue, selectedFilter } = useAppSelector((state) => state.book);
  const { data: user } = useAppSelector((state) => state.user);
  const {
    data: data,
    isLoading,
    error,
  } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteBook] = useDeleteBookMutation();

  const [
    createWishList,
    { isLoading: isWishListLoading, error: wishListError },
  ] = useCreateWishListMutation();

  const [
    createReadingList,
    { isLoading: isReadingListLoading, error: readingListError },
  ] = useCreateReadingListMutation();

  const addWishList = (id: string) => {
    createWishList({
      bookId: id,
      email: user?.email,
    });
    toast.success("Added to wish list", {
      id: "add-wish-list",
    });
  };

  const addReadingList = (id: string) => {
    createReadingList({
      bookId: id,
      email: user?.email,
      status: false,
    });
    toast.success("Added to reading list", {
      id: "add-reading-list",
    });
  };

  const deleteBookHandler = (id: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (shouldDelete) {
      deleteBook(id);
      toast.success("Book deleted", {
        id: "delete-book",
      });
    }
  };

  let content;

  if (isLoading || isWishListLoading || isReadingListLoading) {
    return <Loading />;
  }

  if ((!isLoading && error) || wishListError || readingListError) {
    content = (
      <div>{(error || wishListError || readingListError) as string} </div>
    );
  }

  if (!isLoading && !error && data?.data.length === 0) {
    content = <div className="text-center my-10">No books found</div>;
  }

  const books = data?.data;
  let bookContent: IBook[] = books;
  bookContent = books
    ?.filter((book: IBook) => {
      if (searchValue) {
        return book.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      }
      return book;
    })
    .filter((book: IBook) => {
      if (selectedFilter.length) return selectedFilter.includes(book.genre);
      return book;
    });

  if (!isLoading && !error && data?.data.length > 0) {
    // filtering and searching logic

    content = bookContent.map((book: IBook) => (
      <div className="p-4 md:w-1/3 ">
        <div className="h-full  border-2 shadow-2xl border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="p-6 relative">
            {user?.email === book.email && (
              <div className="flex justify-end absolute top-[5%] right-[5%] flex-col">
                <Link to={`/update-book/${book._id}`}>
                  <span className="text-[#fb6f84]">
                    <BiSolidMessageEdit size={35} />
                  </span>
                </Link>
                <div>
                  <button
                    onClick={() => deleteBookHandler(book._id)}
                    className="text-[#fb6f84]"
                  >
                    <MdDeleteForever size={45} />
                  </button>
                </div>
              </div>
            )}
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              genre: {book?.genre}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              title: {book?.title}
            </h1>
            <p className="leading-relaxed mb-3">author: {book.author}</p>
            <div className="flex items-center flex-wrap">
              <span className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                Publication Date: {book?.publicationDate}
              </span>
            </div>
            <div className="flex items-center flex-wrap">
              <Link to={`/book-details/${book._id}`} className="mt-3">
                <span className="bg-black text-white px-5 py-1  rounded">
                  <button> Book details</button>
                </span>
              </Link>
            </div>
            {user?.email && (
              <div className="flex  mt-5">
                <span className="mr-[10px] p-[10px] text-primary">
                  <button
                    onClick={() => addWishList(book._id)}
                    className="text-[#fb6f84] "
                  >
                    <AiOutlineHeart size={25} className="font-bold" />
                  </button>
                </span>
                <span className="mr-[10px] p-[10px] text-primary">
                  <button
                    onClick={() => addReadingList(book._id)}
                    className="text-[#0ca6e8] "
                  >
                    <AiFillRead size={25} className="font-bold" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-[1200px] px-5 py-24 mx-auto">
        <div className="my-5">
          <SearchAndFilter />
        </div>
        <div className="flex flex-wrap -m-4">{content}</div>

        <div className="flex justify-center w-full mt-10">
          <Link
            to={"/add-book"}
            className=" text-white bg-black border-0 py-2 px-6 focus:outline-none rounded text-lg uppercase"
          >
            Add new book
          </Link>
        </div>
      </div>
    </section>
  );
};
export default AllBookComponent;
