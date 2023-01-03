import React from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
import allocationByResource from "../../asset/images/allocation-by-resource.png";
const AllocationHoursReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass">
        {/* <img src={allocationByResource} alt="allocation by resource"></img> */}
        <iframe title="ALLOCATION BY RESOURCE" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=2c316703-2a63-4120-a60d-4312bf105891&autoAuth=true&ctid=85f46a4d-265f-41b9-aaef-c494b7617e7f&filterPaneEnabled=false&navContentPaneEnabled=false"></iframe>
      </div>
    </div>
  );
};

export default AllocationHoursReport;
