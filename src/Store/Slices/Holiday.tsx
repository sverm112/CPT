import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  market: [],
  location: "2",
  year: "0",
  dataIndia: [],
  dataUS: [],
  currentPage: "1",
  pageSize: "10",
  toggleUS: false,
  toggleIndia: false,
};

const holidaySlice = createSlice({
  name: "holiday",
  initialState: initialState,
  reducers: {
    changeMarket(state, action) {
      state.market = action.payload;
    },
    changeLocation(state, action) {
      state.location = action.payload;
    },
    changeYear(state, action) {
      state.year = action.payload;
    },
    changeDataIndia(state, action) {
      state.dataIndia = action.payload;
    },
    changeDataUS(state, action) {
      state.dataUS = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changePageSize(state, action) {
      state.pageSize = action.payload;
    },
    changeToggleUS(state) {
      state.toggleUS = !state.toggleUS;
    },
    changeToggleIndia(state) {
      state.toggleIndia = !state.toggleIndia;
    },
  },
});

export const holidayActions = holidaySlice.actions;
export default holidaySlice.reducer;
