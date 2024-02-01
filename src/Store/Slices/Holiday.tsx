import { createSlice } from "@reduxjs/toolkit";
const currentyear = (new Date().getFullYear());
const initialState = {
  market: [],
  location :[],
  subLocation :[],
  years : [{label: currentyear, value:currentyear}],
  status: [{label:'Active', value: 'Active'}],
  
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
    changeYears(state, action){
      state.years = action.payload;
    },
    changeStatus(state, action) {
      state.status = action.payload;
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
    clearFilters(state){
      state.market=[];
      state.location=[];
      state.subLocation=[];
      state.status=[];
      state.years=[];
    }
    
  },
});

export const holidayActions = holidaySlice.actions;
export default holidaySlice.reducer;
