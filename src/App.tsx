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
import PTO from "./Master/PTO/PTODetails";

const App = () => {
    const dispatch=useDispatch();
    const userType=useSelector((state:any)=>state.User.userType);
    let userloggedIn = false;
    useEffect(()=>{
        let username=localStorage.getItem("username");
        let userType=localStorage.getItem("userType");
        if(username!=null && userType!=null)
        {
            // if(username=="Test User")
             dispatch(userActions.setUser({username: username,userType: userType}))
        //     else if(username=="Test Admin")
        //     dispatch(userActions.setUser({username:"Test Admin",userType:"Admin"}))
        //     else if(username=="Leslie Kiheri")
        //     dispatch(userActions.setUser({username:"Leslie Kiheri",userType:"Admin"}))
        //     else if(username=="Ashish Khare")
        //     dispatch(userActions.setUser({username:"Ashish Khare",userType:"Admin"}))
        }
        console.log("User Logged in: ", userloggedIn);
    },[]);
    if(userType === "Admin" || userType === "User"){
        userloggedIn = true;
    }
    return (
        <div>
            <ToastContainer autoClose={1000}/>
         {/* {userloggedIn && <Navbar></Navbar> } */}
         <Navbar></Navbar> 
            <HashRouter>
                <Routes>
                    <Route path={APP_ROUTES.LOGINPAGE} element={<LoginPage />} />
                    <Route path={APP_ROUTES.HOLIDAYMASTER} element={!userloggedIn ? <LoginPage /> : <HolidayMaster />} />
                    {/* <Route path={APP_ROUTES.MAINPAGE} element={<MainPage />} /> */}
                    <Route path={APP_ROUTES.ABOUTUS} element={!userloggedIn ? <LoginPage /> : <AboutUs />} />
                    <Route path={APP_ROUTES.ALLOCATIONMARKETRPOT} element={!userloggedIn ? <LoginPage /> : <MarketReport />} />
                    <Route path={APP_ROUTES.ALLOCATIONRESOURCERPOT} element={!userloggedIn ? <LoginPage /> : <ResourceReport />} />
                    <Route path={APP_ROUTES.ALLOCATIONPROJECTRPOT} element={!userloggedIn ? <LoginPage /> : <ProjectReport />} />
                    <Route path={APP_ROUTES.HOLIDAYLISTRPOT}  element={!userloggedIn ? <LoginPage /> : <HolidayListReport />} />
                    {/* <Route path={APP_ROUTES.HOLIDAYMASTER} element={<HolidayMaster />} element={!userloggedIn ? <LoginPage /> : <MarketReport />} /> */}
                    <Route path={APP_ROUTES.EMPLOYEEMASTER} element={!userloggedIn ? <LoginPage /> : <EmployeeMaster />} />
                    <Route path={APP_ROUTES.PROJECTINFO} element={!userloggedIn ? <LoginPage /> : <ProjectInfo />} />
                    <Route path={APP_ROUTES.MARKET} element={!userloggedIn ? <LoginPage /> : <Market />} />
                    <Route path={APP_ROUTES.PAIDTIMEOFF} element={!userloggedIn ? <LoginPage /> : <PTO />} />
                    <Route path={APP_ROUTES.DASHBOARD} element={!userloggedIn ? <LoginPage /> : <Dashboard />} />
                    <Route path={APP_ROUTES.HELP} element={!userloggedIn ? <LoginPage /> : <Help />} />
                    <Route path={APP_ROUTES.PROJECTALLOCATION} element={!userloggedIn ? <LoginPage /> : <ProjectAllocation />} />
                </Routes>
            </HashRouter>

        </div>
    );
};
export default App;