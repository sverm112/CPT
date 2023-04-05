import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles :[ "Developer","Dev Manager","QA","QA Manager","Sr. Developer","Sr. QA","Technical Lead"],
  resourceTypes : ["OGS","GTM","FTE"],
  status : ["Active","InActive"],
  locations: [],
  subLocations: [],
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
  },
});
export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
