import React from "react";
import SideBar from "../../SideBar/SideBar";
import "./AvailabilityReport.css";
import resourceavailablity from "../../asset/images/resource-availablity.png";

const AvailabilityReport = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass">
             <img src={resourceavailablity} alt="resource availability"></img>
            </div>
        </div>
    );
};

export default AvailabilityReport;