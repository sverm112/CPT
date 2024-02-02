import { configureStore } from "@reduxjs/toolkit";
import employeeSliceReducer from "./Slices/Employee";
import filterSliceReducer from "./Slices/Filters";
import holidaySliceReducer from "./Slices/Holiday";
import marketSliceReducer from "./Slices/Market";
import projectSliceReducer from "./Slices/Project";
import projectAllocationReducer from "./Slices/ProjectAllocation";
import userSliceReducer from './Slices/User';
import ptoSliceReducer from './Slices/Pto';
import locationSublocationSliceReducer from './Slices/LocationSublocation';
import modalFilterSliceReducer from './Slices/ModalFilters';

const store = configureStore({
  reducer: {
    Employee: employeeSliceReducer,
    Filters: filterSliceReducer,
    ModalFilters: modalFilterSliceReducer,
    Holiday: holidaySliceReducer,
    Pto: ptoSliceReducer,
    Market: marketSliceReducer,
    Project: projectSliceReducer,
    ProjectAllocation: projectAllocationReducer,
    User :userSliceReducer,
    LocationSublocation : locationSublocationSliceReducer,
  },
});
export default store;
