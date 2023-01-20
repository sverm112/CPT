import React from "react";
import SideBar from "../../SideBar/SideBar";
import "./ResourceReport.css";
import resourceavailablity from "../../asset/images/resource-availablity.png";

const ResourceReport = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass">
            <iframe title="Allocation By Resource" width="1140" height="541.25" src="http://colo-sqlrptqa/reports/powerbi/CPT/Allocation%20By%20Resource?rs:embed=true" ></iframe>
            </div>
        </div>
    );
};

export default ResourceReport;