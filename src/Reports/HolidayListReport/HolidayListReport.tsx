import React from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
import allocationByResource from "../../asset/images/allocation-by-resource.png";
const HolidayListReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass">
        {/* <img src={allocationByResource} alt="allocation by resource"></img> */}
        <iframe title="Holiday List and PTO Tracker" width="1140" height="541.25" src="http://colo-sqlrptqa/reports/powerbi/CPT/Holiday%20list?rs:embed=true"></iframe>
      </div>
    </div>
  );
};

export default HolidayListReport;
