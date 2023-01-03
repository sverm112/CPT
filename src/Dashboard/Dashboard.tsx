import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import dashboardimg from "../asset/images/dashboard.jpg";

const Dashboard = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass">
             <img src={dashboardimg} alt="Dashboard"></img>
            </div>
        </div>
    );
};

export default Dashboard;