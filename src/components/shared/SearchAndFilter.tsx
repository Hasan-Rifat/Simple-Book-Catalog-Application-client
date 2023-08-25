import React, { useState, useEffect, useRef } from "react";
import { useGetAllBooksQuery } from "../../app/features/book/bookApiSlice";
import { IBook } from "../../types/type";
import { useAppDispatch } from "../../app/hooks";
import {
  RClear,
  RFilterValues,
  RSearchValue,
} from "../../app/features/book/bookSlice";

type SearchAndFilterProps = {};

const SearchAndFilter: React.FC<SearchAndFilterProps> = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const { data, isLoading, error } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (!isLoading && !error && data?.data) {
    content = data?.data.map((book: IBook) => (
      <option key={book._id} value={book.genre}>
        {book.genre}
      </option>
    ));
  }

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setMenuVisible(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(RSearchValue(searchValue));
    dispatch(RFilterValues(selectedFilter));
    // You can perform additional actions or API calls here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={handleToggleMenu}
          >
            filter
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {menuVisible && (
            <div
              id="dropdown"
              ref={menuRef}
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute left-0 top-12"
            >
              <select
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
                value={selectedFilter}
                onChange={(e) => handleFilterSelect(e.target.value)}
              >
                <option value="">All genre </option>
                {content}
              </select>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <button
          className="px-5 bg-black text-white rounded-md py-1 mt-5"
          onClick={() => {
            dispatch(RClear());
            setSearchValue("");
            setSelectedFilter("");
          }}
        >
          clear filter and search
        </button>
      </div>
    </form>
  );
};

export default SearchAndFilter;
