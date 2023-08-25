import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllBook from "../pages/AllBook";
import BookDetails from "../pages/BookDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import WishList from "../pages/WishList";
import ReadingList from "../pages/ReadingList";
import PrivateRoute from "./PrivateRoute";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdataBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-book",
        element: <AllBook />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/wish-list",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/reading-list",
        element: (
          <PrivateRoute>
            <ReadingList />,
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
