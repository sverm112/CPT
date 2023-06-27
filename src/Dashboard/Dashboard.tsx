import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Dashboard.css";
import dashboardimg from "../asset/images/dashboard.jpg";

const Dashboard = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass  wrap-element" >
             {/* <img src={dashboardimg} alt="Dashboard"></img> */}
             <iframe title="Dashboard" className="wrapped-iframe"  src="http://colo-sqlrptqa/reports/powerbi/CPT/Dashboard?rs:embed=true"></iframe>
            </div>
        </div>
    );
};

export default Dashboard;