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
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
const columns = [
  // {
  //   name: "Project Id",
  //   selector: (row: { projectId: any }) => row.projectId,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
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
    name: "Status",
    selector: (row: { isActive: any }) => row.isActive,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Created Date",
    selector: (row: { createdDate: any }) => row.createdDate.slice(0, 10),
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

  const projectModels=[
    
    {label :"Waterfall",value:"Waterfall"},
    {label :"Kanban",value:"Kanban"},
    {label :"Scrum",value:"Scrum"},
    {label :"Agile",value:"Agile"},
  ]
  const projects = useSelector((store: any) => store.Project.data);
  const marketList=useSelector((state: any) => state.Market.data);
  const toggle = useSelector((store: any) => store.Project.toggle);
  const projectModelSelected= useSelector((store: any) => store.Project.projectModel);
  const marketSelected = useSelector((store: any) => store.Project.market);
  const expenseTypeSelected = useSelector((store: any) => store.Project.expenseType);
  const statusSelected = useSelector((store: any) => store.Project.status);

  const getProjectDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Projects/GetAllProjects");
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,projectMarket : row.marketName,projectId : row.pkProjectID, isActive : row.isActive==1 ? "Active" : "Inactive" }));
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Markets/GetAllMarkets");
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);


  const filteredProjects=projects.filter(
    (project : any)=>{

      const projectModelOptions=projectModelSelected.map((projectModel: any) => projectModel.value)
      const marketOptions=marketSelected.map((market: any)=>market.value);
      const expenseTypeOptions=expenseTypeSelected.map((expenseType: any)=>expenseType.value);
      const statusOptions=statusSelected.map((status: any)=>status.value);
      //const resourceRow=JSON.stringify(resource);
      console.log(statusOptions);
      if((!marketSelected.length) ||(marketSelected.length>0 && marketOptions.includes(project.projectMarket)==true))
      { 
          if( (!expenseTypeSelected.length) || (expenseTypeSelected.length>0 && expenseTypeOptions.includes(project.expenseType)==true))
          {
            
            if((!statusSelected.length)|| (statusSelected.length>0 && statusOptions.includes(project.isActive) ))
            {
              if((!projectModelSelected.length)|| (projectModelSelected.length>0 && projectModelOptions.includes(project.projectModel) ))
              return true;
            }
            
          }
        
      }
      return false;
    }
  );
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Project Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Project Info</span>
            </p>
            <div className="btns project">
              {/* <button type="button" className="btn btn-primary upload-button-btn" style={{ marginRight: "150px" }}>
                <i className="las la-file-upload"></i>
              </button>
              <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ marginRight: "150px" }}
              /> */}
              <ModalDialog />
            </div>
          </div>
          <div className="row filter-row">
          <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Project Model
              </label>
              <MultiSelect
                options={projectModels}
                value={projectModelSelected}
                onChange={(event: any) => dispatch(projectActions.changeProjectModel(event))}
                labelledBy="Select Expense Type"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Market
              </label>
              <MultiSelect
                options={(marketList.map((market:any)=>({label : market.marketName, value : market.marketName})))}
                value={marketSelected}
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
                value={expenseTypeSelected}
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
                value={statusSelected}
                onChange={(event: any) => dispatch(projectActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
          </div>
          <Table columns={columns} data={filteredProjects} />
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

  const marketList=useSelector((state: any) => state.Market.data);
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectModel, setProjectModel] = useState("0");
  const [projectMarket, setProjectMarket] = useState("0");
  const [expenseType, setExpenseType] = useState("0");

  const resetFormFields =()=>{
    setProjectCode("");
    setProjectName("");
    setProjectModel("0");
    setProjectMarket("0");
    setExpenseType("0");
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      projectCode: projectCode,
      projectName: projectName,
      projectModel: projectModel,
      expenseType: expenseType,
      fkMarketID: projectMarket=="0" ? 0 :Number(projectMarket),
      createdBy: "Admin"
    };
    try {
      const response = await fetch("https://localhost:44314/api/v1/Projects/PostProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataResponse = await response.json();
      if (dataResponse.length) {
        if (dataResponse[0].statusCode == "201") {
          console.log(dataResponse[0].statusReason);
          console.log(dataResponse[0].recordsCreated);

          dispatch(projectActions.changeToggle());
          resetFormFields();
          closeModal();
          toast.success("Project Added Successfully")
        } else toast.error(dataResponse[0].errorMessage);
      } else toast.error("Some Error occured.");
    } catch {
      toast.error("Some Error occured.");
    }
  };
    

  const getMarketDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Markets/GetAllMarkets");
    const data = await response.json();
    console.log(data);
    dispatch(marketActions.changeData(data));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);

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
                    value={projectModel}
                    onChange={(event: any) => setProjectModel(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="Waterfall">Waterfall</option>
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
                    onChange={(event: any) => {console.log(projectMarket);setProjectMarket(event.target.value)}}
                  >
                    <option value="0">Select</option>
                    {marketList.map((market:any)=><option key={market.pkMarketID} value={market.pkMarketID.toString()}>{market.marketName}</option>)}
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
