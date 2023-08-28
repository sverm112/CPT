import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import dashboardimg from "../asset/images/dashboard.jpg";
import { DASHBOARD_REPORT } from "../constants";

const Dashboard = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass  wrap-element" >
             {/* <img src={dashboardimg} alt="Dashboard"></img> */}
             <iframe title="Dashboard" className="wrapped-iframe"  src={DASHBOARD_REPORT}></iframe>
            </div>
        </div>
    );
};

export default Dashboard;