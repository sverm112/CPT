import React from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
import allocationByResource from "../../asset/images/allocation-by-resource.png";
import { closeNav } from "../../SideBar/SideBarJs";
import "../../../src/style.css";
const HolidayListReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass wrap-element" onClick={closeNav}>
        {/* <img src={allocationByResource} alt="allocation by resource"></img> */}
        <iframe title="Holiday List and PTO Tracker" className="wrapped-iframe" src="http://colo-sqlrptqa/reports/powerbi/CPT/Holiday%20list?rs:embed=true"></iframe>
      </div>
    </div>
  );
};

export default HolidayListReport;
