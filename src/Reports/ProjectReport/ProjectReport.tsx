import SideBar from "../../SideBar/SideBar";
import allocationByProject from "../../asset/images/allocation-by-project.png";
import { closeNav } from "../../SideBar/SideBarJs";
import "../../../src/style.css";
import { ALLOCATION_BY_PROJECT_REPORT } from "../../constants";
const ProjectReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass wrap-element" onClick={closeNav}>
      <iframe title="Allocation By Project" className="wrapped-iframe" src={ALLOCATION_BY_PROJECT_REPORT}></iframe>
      </div>
    </div>
  );
};

export default ProjectReport;
