import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  market: [],
  location :[],
  subLocation :[],
  
  data: [],
  currentPage: "1",
  pageSize: "10",
  toggle: false,
  
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
    changeSubLocation(state, action) {
      state.subLocation = action.payload;
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

export const holidayActions = holidaySlice.actions;
export default holidaySlice.reducer;
