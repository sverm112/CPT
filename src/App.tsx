import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import AboutUs from "./AboutUs/AboutUs";
import Navbar from "./NavBar/Navbar";
import AvailabilityReport from "./Reports/AvailabilityReport/AvailabilityReport";
import AllocationHoursReport from "./Reports/AllocationHoursReport/AllocationHoursReport";
import HolidayMaster from "./Master/HolidayMaster/HolidayMaster";
import Dashboard from "./Dashboard/Dashboard";
import "./style.css";
import "./SideBar/SideBar.css";
import { APP_ROUTES } from "./constants";
import EmployeeMaster from "./Master/EmployeeMaster/EmployeeMaster";
import ProjectInfo from "./Master/ProjectInfo/ProjectInfo";
import Market from "./Master/Market/Market";
import Help from "./Help/Help";
import ProjectReport from "./Reports/ProjectReport/ProjectReport";
import MarketReport from "./Reports/MarketReport/MarketReport";
import ExpenseReport from "./Reports/ExpenseReport/ExpenseReport";
import ProjectAllocation from "./ProjectAllocation/ProjectAllocation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <ToastContainer/>
            <Navbar></Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path={APP_ROUTES.LOGINPAGE} element={<LoginPage />} />
                    {/* <Route path={APP_ROUTES.MAINPAGE} element={<MainPage />} /> */}
                    <Route path={APP_ROUTES.ABOUTUS} element={<AboutUs />} />
                    <Route path={APP_ROUTES.ABVAILABILITYRPOT} element={<AvailabilityReport />} />
                    <Route path={APP_ROUTES.ALLOCATIONHOURSRPOT} element={<AllocationHoursReport />} />
                    <Route path={APP_ROUTES.EXPENSERPOT} element={<ExpenseReport />} />
                    <Route path={APP_ROUTES.MARKETRPOT} element={<MarketReport />} />
                    <Route path={APP_ROUTES.PROJECTRPOT} element={<ProjectReport />} />
                    <Route path={APP_ROUTES.HOLIDAYMASTER} element={<HolidayMaster />} />
                    <Route path={APP_ROUTES.EMPLOYEEMASTER} element={<EmployeeMaster />} />
                    <Route path={APP_ROUTES.PROJECTINFO} element={<ProjectInfo />} />
                    <Route path={APP_ROUTES.MARKET} element={<Market/>} />
                    <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={APP_ROUTES.HELP} element={<Help />} />
                    <Route path={APP_ROUTES.PROJECTALLOCATION} element={<ProjectAllocation />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
};
export default App;