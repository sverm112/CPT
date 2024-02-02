import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import dashboardimg from "../asset/images/dashboard.jpg";
import { APP_ROUTES, DASHBOARD_REPORT } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store/Slices/User";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = (props: any) => {
    const location = useLocation();
    console.log("Location Data: ", location.state);
    // const navigate = useNavigate();
    // const [loggedIn, setLoggedIn] = useState(false);
    // if(window.location.href.includes('loggedIn')){
    //     setLoggedIn(true);
    //     navigate(APP_ROUTES.DASHBOARD)
    // }
    return (
        <div >
            { location.state == null ? <SideBar/> : null }
            <div className="col-md-12 bg-mainclass  wrap-element" >
             {/* <img src={dashboardimg} alt="Dashboard"></img> */}
             <iframe title="Dashboard" className="wrapped-iframe"  src={DASHBOARD_REPORT}></iframe>
            </div>
{/* } */}
        </div>
    );
};

export default Dashboard;