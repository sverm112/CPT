import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
// import ModalDialog from '../../modal/modal';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";

import { projectActions } from "../../Store/Slices/Project";
const columns = [
  {
    name: "Project Id",
    selector: (row: { projectId: any }) => row.projectId,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Code",
    selector: (row: { projectCode: any }) => row.projectCode,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Name",
    selector: (row: { projectName: any }) => row.projectName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Model",
    selector: (row: { projectModel: any }) => row.projectModel,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { projectMarket: any }) => row.projectMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Expense Type",
    selector: (row: { expenseType: any }) => row.expenseType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Active",
    selector: (row: { active: any }) => row.active,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Created By",
    selector: (row: { createdBy: any }) => row.createdBy,
    sortable: true,
    reorder: true,
    filterable: true,
  },
];

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};
const ProjectInfo = () => {
  const dispatch = useDispatch();
  const markets = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];
  const expenseTypes = [
    { label: "CAPEX", value: "CAPEX" },
    { label: "OPEX", value: "OPEX" },
  ];

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];
  const projects = useSelector((store: any) => store.Project.data);
  const toggle = useSelector((store: any) => store.Project.toggle);
  const market = useSelector((store: any) => store.Project.market);
  const expenseType = useSelector((store: any) => store.Project.expenseType);
  const status = useSelector((store: any) => store.Project.status);

  const getProjectDetails = async () => {
    const response = await fetch("https://localhost:44314/api/projects");
    const dataGet = await response.json();
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
  }, [toggle]);
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Project Info</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Project Info</span>
            </p>
            <div className="btns project">
              <button type="button" className="btn btn-primary upload-button-btn" style={{ marginRight: "150px" }}>
                <i className="las la-file-upload"></i>
              </button>
              <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ marginRight: "150px" }}
              />
              <ModalDialog />
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Market
              </label>
              <MultiSelect
                options={markets}
                value={market}
                onChange={(event: any) => dispatch(projectActions.changeMarket(event))}
                labelledBy="Select Market"
                valueRenderer={customValueRenderer}
              />
            </div>

            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Expense Type
              </label>
              <MultiSelect
                options={expenseTypes}
                value={expenseType}
                onChange={(event: any) => dispatch(projectActions.changeExpenseType(event))}
                labelledBy="Select Expense Type"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className=" col-md-2 form-group">
              <label htmlFor="activeDropdown" className="form-label">
                Status
              </label>
              <MultiSelect
                options={statusOptions}
                value={status}
                onChange={(event: any) => dispatch(projectActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
          </div>
          <Table columns={columns} data={projects} />
        </div>
      </div>
    </div>
  );
};

function ModalDialog() {
  const dispatch = useDispatch();
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };

  function closeModal() {
    return invokeModal(false);
  }

  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectModal, setProjectModal] = useState("0");
  const [projectMarket, setProjectMarket] = useState("0");
  const [expenseType, setExpenseType] = useState("0");
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let dataPost = {
      projectCode: projectCode,
      projectName: projectName,
      projectModal: projectModal,
      projectMarket: projectMarket,
      expenseType: expenseType,
    };
    try {
      const response = await fetch("https://localhost:44314/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      console.log(response);
      dispatch(projectActions.changeToggle());
    } catch {
      console.log("Hi");
    }
    // setMarketId("");
    //   setMarketCode("");
    //   invokeModal(false);
  };

  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px" }}
        variant="primary"
        onClick={initModal}
      >
        <i className="las la-plus"></i> Add Project
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New Project</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="projectCode">
                  Project Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectCode"
                  value={projectCode}
                  onChange={(event: any) => setProjectCode(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="projectName">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={projectName}
                  onChange={(event: any) => setProjectName(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="projectModel">
                  Project Model
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="projectModel"
                    value={projectModal}
                    onChange={(event: any) => setProjectModal(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="WaterFall">WaterFall</option>
                    <option value="Kanban">Kanban</option>
                    <option value="Scrum">Scrum</option>
                    <option value="Agile">Agile</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="projectMarket">
                  Market
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="projectMarket"
                    value={projectMarket}
                    onChange={(event: any) => setProjectMarket(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="AppleCare">AppleCare</option>
                    <option value="Beaver">Beaver</option>
                    <option value="CA">CA</option>
                    <option value="HCP">HCP</option>
                    <option value="Monarch">Monarch</option>
                    <option value="NAMM">NAMM</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="expenseType">
                  Expense Type
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="expenseType"
                    value={expenseType}
                    onChange={(event: any) => setExpenseType(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="CAPEX">CAPEX</option>
                    <option value="OPEX">OPEX</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
                    <Button variant="danger" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ProjectInfo;
