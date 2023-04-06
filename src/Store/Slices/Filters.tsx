import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles :[ "Developer","Dev Manager","QA","QA Manager","Sr. Developer","Sr. QA","Technical Lead"],
  resourceTypes : ["OGS","GTM","FTE"],
  status : ["Active","InActive"],
  locations: [],
  subLocations: [],
  ptoTypes :[{id : 16, ptoType : "Privilege"},{id : 18, ptoType : "Casual"},{id : 19, ptoType : "Sick"},{id : 20, ptoType : "Primary Caregiver"},{id : 21, ptoType : "Secondary Caregiver"},],
  months :["January","February","March","April","May","June","July","August","September","October","November","December"]
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
    changePtoTypes(state, action){
      state.ptoTypes = action.payload;
    },
    changeMonths(state, action){
      state.months = action.payload;
    }
  },
});
export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
