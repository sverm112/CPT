import { createSlice } from "@reduxjs/toolkit";
const currentyear = (new Date().getFullYear());
const initialState = {
  resourceName : [],
  resourceManager: [],
  ptoTypes: [],
  startDate: [],
  endDate: [],
  months: [],
  years: [{label:currentyear, value: currentyear}],
  numberOfDays: [],
  remarks: [],
  status: [{label:'Active', value: 'Active'}],
  data: [],
  currentPage: "1",
  pageSize: "10",
  toggle: false,
};

const ptoSlice = createSlice({
  name: "Pto",
  initialState: initialState,
  reducers: {
    changeResourceName(state, action) {
      state.resourceName = action.payload;
    },
    changeResourceManager(state, action) {
      state.resourceManager = action.payload;
    },
    changePtoType(state, action) {
      state.ptoTypes = action.payload;
    },
    changeStartDate(state, action){
        state.startDate = action.payload;
    },
    changeEndDate(state, action){
        state.endDate = action.payload;
    },
    changeMonth(state, action){
        state.months = action.payload;
    },
    changeYears(state, action){
        state.years = action.payload;
    },
    changeNumberOfDays(state, action){
        state.numberOfDays = action.payload;
    },
    changeRemarks(state, action){
        state.remarks = action.payload;
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
        state.resourceName = [];
        state.resourceManager= [];
        state.ptoTypes= [];
        state.startDate= [];
        state.endDate= [];
        state.months = [];
        state.years = [];
        state.numberOfDays= [];
        state.remarks= [];
        state.status= [];
    }
  },
});

export const ptoActions = ptoSlice.actions;
export default ptoSlice.reducer;
