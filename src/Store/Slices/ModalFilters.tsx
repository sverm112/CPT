import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles :[ "Developer","Director", "Manager", "QA", "Technical Analyst", "Technical Writer"],
  // ,"Developer","Dev Manager","Technical Writer","Manager","Director","Technical Analyst","QA","QA Manager","Sr. Developer","Sr. QA","Technical Lead"
  resourceTypes : ["OGA","GTM","FTE"],
  status : ["Active","Closed","InActive","Pending"],
  locations: [],
  subLocations: [],
  ptoTypes :[],
  months :[{id:1, name:"January"},{id:2,name:"February"},{id:3, name:"March"},
  {id:4,name:"April"},{id:5,name:"May"},{id:6,name:"June"},
  {id:7,name:"July"},{id:8,name:"August"},{id:9,name:"September"},{id:10,name:"October"},{id:11,name:"November"},{id:12,name:"December"}],
  years : [2020, 2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
};

const modalFilterslice = createSlice({
  name: "modalFilters",
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
    },
    clearFilters(state){
      state.subLocations=[];
      state.status=[];
    }
  },
});
export const modalFilterActions = modalFilterslice.actions;
export default modalFilterslice.reducer;
