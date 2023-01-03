import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  market: [],
  role: [],
  resourceType: [],
  location: [],
  subLocations: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    changeMarket(state, action) {
      state.market = action.payload;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
    changeResourceType(state, action) {
      state.resourceType = action.payload;
    },
    changeLocation(state, action) {
      state.location = action.payload;
    },
    changeSubLocations(state, action) {
      state.subLocations = action.payload;
    },
  },
});
export default filterSlice.reducer;
