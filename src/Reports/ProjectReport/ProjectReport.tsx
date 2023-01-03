import SideBar from "../../SideBar/SideBar";
import allocationByProject from "../../asset/images/allocation-by-project.png";
const ProjectReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass">
      <iframe title="ALLOCATION BY PROJECT" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=d4b2e7b0-2020-492c-81c0-7c30e5795e81&autoAuth=true&ctid=85f46a4d-265f-41b9-aaef-c494b7617e7f&filterPaneEnabled=false&navContentPaneEnabled=false"></iframe>
      </div>
    </div>
  );
};

export default ProjectReport;
