import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface according to your user data structure
interface ISearchAndFilter {
  searchValue: string;
  selectedFilter: string;
}

const initialState: ISearchAndFilter = {
  selectedFilter: "",
  searchValue: "",
  // ... other initial state properties
};

const bookSlice = createSlice({
  name: "SearchAndFilters",
  initialState,
  reducers: {
    RSearchValue: (state: ISearchAndFilter, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    RFilterValues: (state: ISearchAndFilter, action: PayloadAction<string>) => {
      state.selectedFilter = action.payload;
    },
    RClear: (state: ISearchAndFilter) => {
      state.searchValue = "";
      state.selectedFilter = "";
    },
  },
});

export const { RSearchValue, RFilterValues, RClear } = bookSlice.actions;
export default bookSlice.reducer;
