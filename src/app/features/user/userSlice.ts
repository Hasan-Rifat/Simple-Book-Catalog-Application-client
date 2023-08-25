import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface according to your user data structure
interface User {
  firstName: string;
  lastName: string;
  email: string;
  // Other user properties
}

interface UserState {
  data: User | null;
  // ... other state properties
}

const initialUser = localStorage.getItem("user");

const initialState: UserState = {
  data: initialUser ? JSON.parse(initialUser) : null,
  // ... other initial state properties
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | null>) => {
      const newUser = action.payload;
      state.data = {
        firstName: newUser?.firstName || "",
        lastName: newUser?.lastName || "",
        email: newUser?.email || "",
      };
      localStorage.setItem("user", newUser ? JSON.stringify(newUser) : "");
    },
    logOut: (state: UserState) => {
      state.data = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
