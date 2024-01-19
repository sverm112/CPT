import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  market: [],
  location :[],
  subLocation :[],
  status: [{label:'Active', value: 'Active'}],
  
  data: [],
  currentPage: "1",
  pageSize: "10",
  toggle: false,
  
};

const locationSublocationSlice = createSlice({
  name: "locationSublocation",
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
    }
    
  },
});

export const locationSublocationActions = locationSublocationSlice.actions;
export default locationSublocationSlice.reducer;
