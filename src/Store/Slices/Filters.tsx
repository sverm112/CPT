import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles :[ "Developer","Dev Manager","Technical Writer","Manager","Director","Technical Analyst","QA","QA Manager","Sr. Developer","Sr. QA","Technical Lead"],
  resourceTypes : ["OGS","GTM","FTE"],
  status : ["Active","InActive"],
  locations: [],
  subLocations: [],
  ptoTypes :[],
  months :["January","February","March","April","May","June","July","August","September","October","November","December"],
  years : ["2020", "2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"]
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    changeRole(state, action) {
      state.roles = action.payload;
    },
    changeResourceType(state, action) {
      state.resourceTypes = action.payload;
    },
    changeLocations(state, action) {
      state.locations = action.payload;
    },
    changeSubLocations(state, action) {
      state.subLocations = action.payload;
    },
    changePTOTypes(state, action){
      state.ptoTypes = action.payload;
    },
    changeMonths(state, action){
      state.months = action.payload;
    },
    changeYears(state, action){
      state.years = action.payload;
    }
  },
});
export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
