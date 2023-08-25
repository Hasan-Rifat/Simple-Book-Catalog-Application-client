import React, { useState } from "react";
import { useCreateNewBookMutation } from "../app/features/book/bookApiSlice";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    email: "",
    reviews: [],
  });

  const navigate = useNavigate();
  const [createNewBook] = useCreateNewBookMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createNewBook(formData);
    toast.success("Book added successfully!", {
      id: "add-book-success",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.title}
              onChange={handleInputChange}
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
              name="author"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.author}
              onChange={handleInputChange}
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
              name="genre"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.genre}
              onChange={handleInputChange}
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
              name="publicationDate"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.publicationDate}
              onChange={handleInputChange}
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
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
