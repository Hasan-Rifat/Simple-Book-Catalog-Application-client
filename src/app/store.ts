import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./features/user/userSlice";
import bookSlice from "./features/book/bookSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    book: bookSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
