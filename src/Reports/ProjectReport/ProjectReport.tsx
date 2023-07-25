import SideBar from "../../SideBar/SideBar";
import allocationByProject from "../../asset/images/allocation-by-project.png";
import { closeNav } from "../../SideBar/SideBarJs";
import "../../../src/style.css";
const ProjectReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass wrap-element" onClick={closeNav}>
      <iframe title="Allocation By Project" className="wrapped-iframe" src="http://colo-sqlrptqa/reports/powerbi/CPT/Allocation%20By%20Project?rs:embed=true"></iframe>
      </div>
    </div>
  );
};

export default ProjectReport;
