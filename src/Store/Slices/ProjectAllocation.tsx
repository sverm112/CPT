import { createSlice } from "@reduxjs/toolkit";

const currentyear = (new Date().getFullYear());

const initialState = {
  data: [],
  resourceMarket :[],
  resourceType :[],
  role : [],
  expenseType :[],
  projectMarket:[],
  projectName:[],
  status: [{label:'Active', value: 'Active'}],
  location : '0',
  currentPage: "1",
  pageSize: "10",
  years: [{label:currentyear, value: currentyear}],
  toggle: false,
  startDate:[],
  endDate:[],
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
    changeProjectName(state,action){
      state.projectName=action.payload
    },
    changeExpenseType(state,action){
      state.expenseType=action.payload
    },
    changeProjectMarket(state,action){
      state.projectMarket=action.payload
    },
    changeStatus(state, action) {
      state.status = action.payload;
    },
    changeYears(state, action){
      state.years = action.payload;
    },
    changeLocation(state,action){
      state.location=action.payload
    },
    changeStartDate(state, action){
      state.startDate = action.payload;
    },
    changeEndDate(state, action){
      state.endDate = action.payload;
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
      state.status=[];
      state.projectName=[];
      state.startDate=[];
      state.endDate=[];
    }
  },
});

export const projectAllocationActions = projectAllocationSlice.actions;
export default projectAllocationSlice.reducer;
