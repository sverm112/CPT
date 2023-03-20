import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import AboutUs from "./AboutUs/AboutUs";
import Navbar from "./NavBar/Navbar";
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
import ProjectAllocation from "./ProjectAllocation/ProjectAllocation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ResourceReport from "./Reports/ResourceReport/ResourceReport";
import HolidayListReport from "./Reports/HolidayListReport/HolidayListReport";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./Store/Slices/User";

const App = () => {
    const dispatch=useDispatch();
    const userType=useSelector((state:any)=>state.User.userType);
    useEffect(()=>{
        let username=sessionStorage.getItem("username");
        let userType=sessionStorage.getItem("userType");
        if(username!=null && userType!=null)
        {
            if(username=="Test User")
             dispatch(userActions.setUser({username:"Test User",userType:"User"}))
            else if(username=="Test Admin")
            dispatch(userActions.setUser({username:"Test Admin",userType:"Admin"}))
        }
    },[]);
    return (
        <div>
            <ToastContainer autoClose={1000}/>
            <Navbar></Navbar>
            <HashRouter>
                <Routes>
                    <Route path={APP_ROUTES.LOGINPAGE} element={<LoginPage />} />
                    {/* <Route path={APP_ROUTES.MAINPAGE} element={<MainPage />} /> */}
                    <Route path={APP_ROUTES.ABOUTUS} element={<AboutUs />} />
                    <Route path={APP_ROUTES.ALLOCATIONMARKETRPOT} element={<MarketReport />} />
                    <Route path={APP_ROUTES.ALLOCATIONRESOURCERPOT} element={<ResourceReport />} />
                    <Route path={APP_ROUTES.ALLOCATIONPROJECTRPOT} element={<ProjectReport />} />
                    <Route path={APP_ROUTES.HOLIDAYLISTRPOT} element={<HolidayListReport />} />
             <Route path={APP_ROUTES.HOLIDAYMASTER} element={<HolidayMaster />} />
            <Route path={APP_ROUTES.EMPLOYEEMASTER} element={<EmployeeMaster />} />
            <Route path={APP_ROUTES.PROJECTINFO} element={<ProjectInfo />} />
            <Route path={APP_ROUTES.MARKET} element={<Market/>} />
                    <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={APP_ROUTES.HELP} element={<Help />} />
            <Route path={APP_ROUTES.PROJECTALLOCATION} element={<ProjectAllocation />} />
                </Routes>
            </HashRouter>

        </div>
    );
};
export default App;