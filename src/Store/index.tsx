import { configureStore } from "@reduxjs/toolkit";
import employeeSliceReducer from "./Slices/Employee";
import filterSliceReducer from "./Slices/Filters";
import holidaySliceReducer from "./Slices/Holiday";
import marketSliceReducer from "./Slices/Market";
import projectSliceReducer from "./Slices/Project";
import projectAllocationReducer from "./Slices/ProjectAllocation";
import userSliceReducer from './Slices/User';

const store = configureStore({
  reducer: {
    Employee: employeeSliceReducer,
    Filters: filterSliceReducer,
    Holiday: holidaySliceReducer,
    Market: marketSliceReducer,
    Project: projectSliceReducer,
    ProjectAllocation: projectAllocationReducer,
    User :userSliceReducer,
  },
});
export default store;
