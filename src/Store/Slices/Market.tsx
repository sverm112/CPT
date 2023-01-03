import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marketCode: [],
  data: [],
  currentPage: "1",
  pageSize: "10",
  form: {
    marketCode: "",
  },
  toggle: false,
};

const marketSlice = createSlice({
  name: "Market",
  initialState: initialState,
  reducers: {
    changeMarketCode(state, action) {
      state.marketCode = action.payload;
    },
    changeData(state, action) {
      state.data = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changePageSize(state, action) {
      state.pageSize = action.payload;
    },
    changeToggle(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const marketActions = marketSlice.actions;
export default marketSlice.reducer;
