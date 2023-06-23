import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectModel : [],
  market: [],
  expenseType: [],
  status: [{label:'Active', value: 'Active'}],
  data: [],
  currentPage: "1",
  pageSize: "10",
  toggle: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    changeProjectModel(state, action) {
      state.projectModel = action.payload;
    },
    changeMarket(state, action) {
      state.market = action.payload;
    },
    changeExpenseType(state, action) {
      state.expenseType = action.payload;
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
      state.projectModel=[];
      state.expenseType=[];
      state.status=[];
    }
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;
