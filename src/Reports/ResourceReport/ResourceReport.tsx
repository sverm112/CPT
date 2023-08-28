import React from "react";
import SideBar from "../../SideBar/SideBar";
import "./ResourceReport.css";
import resourceavailablity from "../../asset/images/resource-availablity.png";
import { closeNav } from "../../SideBar/SideBarJs";
import "../../../src/style.css";
import { ALLOCATION_BY_RESOURCE_REPORT } from "../../constants";
const ResourceReport = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass wrap-element" onClick={closeNav}>
            <iframe title="Allocation By Resource" className="wrapped-iframe" width="1140" height="541.25" src={ALLOCATION_BY_RESOURCE_REPORT}></iframe>
            </div>
        </div>
    );
};

export default ResourceReport;