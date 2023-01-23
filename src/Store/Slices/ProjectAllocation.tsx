import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  resourceMarket :[],
  resourceType :[],
  role : [],
  expenseType :[],
  projectMarket:[],
  location : '0',
  currentPage: "1",
  pageSize: "10",
  toggle: false,
};

const projectAllocationSlice = createSlice({
  name: "projectAllocation",
  initialState: initialState,
  reducers: {
    changeData(state, action) {
      state.data = action.payload;
    },
    changeResourceMarket(state,action){
      state.resourceMarket=action.payload
    },
    changeResourceType(state,action){
      state.resourceType=action.payload
    },
    changeRole(state,action){
      state.role=action.payload
    },
    changeExpenseType(state,action){
      state.expenseType=action.payload
    },
    changeProjectMarket(state,action){
      state.projectMarket=action.payload
    },
    changeLocation(state,action){
      state.location=action.payload
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
      state.resourceMarket=[];
      state.role=[];
      state.resourceType=[];
      state.projectMarket=[];
      state.expenseType=[];
      state.location="0";
    }
  },
});

export const projectAllocationActions = projectAllocationSlice.actions;
export default projectAllocationSlice.reducer;
