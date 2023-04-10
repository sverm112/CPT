import { useState, useEffect } from "react";
import SideBar from "../../SideBar/SideBar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../../Store/Slices/Project";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import { employeeActions } from "../../Store/Slices/Employee";
import DownloadBtn from "../../Export/DownloadBtn";
import { validateForm, validateSingleFormGroup } from "../../utils/validations";
import { Base_URL } from "../../constants";

const columns = [
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
    selector: (row: { projectModel: any }) => row.projectModel == "0" ? "" : row.projectModel,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { projectMarket: any }) => row.projectMarket == "0" ? "" : row.projectMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Program Manager",
    selector: (row: { programManager: any }) => row.programManager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Expense Type",
    selector: (row: { expenseType: any }) => row.expenseType == "0" ? "" : row.expenseType,
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
    selector: (row: { createdDate: any }) => row.createdDate,
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
  {
    name: "Updated Date",
    selector: (row: { updatedDate: any }) => row.updatedDate,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Updated By",
    selector: (row: { updatedBy: any }) => row.updatedBy,
    sortable: true,
    reorder: true,
    filterable: true,
  },
];

const columnsAndSelectors=[
  {'name':'Project Code"','selector':'projectCode','default':'true'},
  {'name':'Project Name','selector':'projectName','default':'true'},
  {'name':'Project Model','selector':'projectModel','default':'true'},
  {'name':'Market','selector':'projectMarket','default':'true'},
  {'name':'Program Manager','selector':'programManager','default':'true'},
  {'name':'Status','selector':'isActive','default':'true'},
  {'name':'Created Date','selector':'createdDate','default':'true'},
  {'name':'Created By','selector':'createdBy','default':'true'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},
  
  
]
const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};
const ProjectInfo = () => {
  const dispatch = useDispatch();
  const expenseTypes = [
    { label: "CAPEX", value: "CAPEX" },
    { label: "OPEX", value: "OPEX" },
  ];
  const status = useSelector((state: any) => state.Filters.status);
  const projectModels = [
    { label: "Waterfall", value: "Waterfall" },
    { label: "Kanban", value: "Kanban" },
    { label: "Scrum", value: "Scrum" },
    { label: "Agile", value: "Agile" },
  ]
  const projects = useSelector((store: any) => store.Project.data);
  const marketList = useSelector((state: any) => state.Market.data);
  const toggle = useSelector((store: any) => store.Project.toggle);
  const projectModelSelected = useSelector((store: any) => store.Project.projectModel);
  const marketSelected = useSelector((store: any) => store.Project.market);
  const expenseTypeSelected = useSelector((store: any) => store.Project.expenseType);
  const statusSelected = useSelector((store: any) => store.Project.status);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updateProjectDetails, setUpdateProjectDetails] = useState({});
  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }

  const getProjectDetails = async () => {
    const response = await fetch(`http://10.147.172.18:9190/api/v1/Projects/GetAllProjects`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, projectMarket: row.marketName, projectId: row.pkProjectID, createdDate: row.createdDate.slice(0, 10), isActive: row.isActive == 1 ? "Active" : "InActive" }));
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch(`http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);


  const filteredProjects = projects.filter(
    (project: any) => {
      const projectModelOptions = projectModelSelected.map((projectModel: any) => projectModel.value)
      const marketOptions = marketSelected.map((market: any) => market.value);
      const expenseTypeOptions = expenseTypeSelected.map((expenseType: any) => expenseType.value);
      const statusOptions = statusSelected.map((status: any) => status.value);
      console.log(statusOptions);
      if ((!marketSelected.length) || (marketSelected.length > 0 && marketOptions.includes(project.projectMarket) == true)) {
        if ((!expenseTypeSelected.length) || (expenseTypeSelected.length > 0 && expenseTypeOptions.includes(project.expenseType) == true)) {

          if ((!statusSelected.length) || (statusSelected.length > 0 && statusOptions.includes(project.isActive))) {
            if ((!projectModelSelected.length) || (projectModelSelected.length > 0 && projectModelOptions.includes(project.projectModel)))
              return true;
          }
        }
      }
      return false;
    }
  );
  const handleRowDoubleClicked = (row: any) => {
    console.log(row);
    setShowModal(true);
    setAction("Update");
    let data = { ...row, isActive: row.isActive == "Active" ? "1" : "2" }
    console.log(data);
    setUpdateProjectDetails(data);
  };

  //start constants for export
  const title = "Project Details";
  const selectors = ['projectCode', 'projectName', 'projectModel',
    'projectMarket', 'programManager', 'expenseType',
    'isActive', 'createdDate', 'createdBy'];
  //end constants for export

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
              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateProjectDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}

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
                options={(marketList.map((market: any) => ({ label: market.marketName, value: market.marketName })))}
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
                options={status.map((status: any) => ({ label: status, value: status }))}
                value={statusSelected}
                onChange={(event: any) => dispatch(projectActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(projectActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table columnsAndSelectors={columnsAndSelectors} columns={columns} data={filteredProjects} onRowDoubleClicked={handleRowDoubleClicked} title={title}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddModal = (props: any) => {
  const dispatch = useDispatch();


  const marketList = useSelector((state: any) => state.Market.data);
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectModel, setProjectModel] = useState("0");
  const [projectMarket, setProjectMarket] = useState("0");
  const [expenseType, setExpenseType] = useState("0");
  const [programManager, setProgramManager] = useState("");

  const resetFormFields = () => {
    setProjectCode("");
    setProjectName("");
    setProjectModel("0");
    setProjectMarket("0");
    setExpenseType("0");
    setProgramManager("");
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      projectCode: projectCode,
      projectName: projectName,
      projectModel: projectModel,
      expenseType: expenseType,
      fkMarketID: projectMarket == "0" ? 0 : Number(projectMarket),
      programManager: programManager,
      createdBy: "Admin"
    };
    try {
      validateForm('#AddProjectForm');
      const response = await fetch(`http://10.147.172.18:9190/api/v1/Projects/PostProjects`, {
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
          props.closeModal();
          toast.success("Project Added Successfully")
        } else toast.error(dataResponse[0].errorMessage);
      } else toast.error("Some Error occured.");
    } catch {
      toast.error("Some Error occured.");
    }
  };

  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Add Project
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New Project</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="AddProjectForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="ProjectCodeInput">
                <label className="form-label" htmlFor="projectCode">
                  Project Code
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="projectCode"
                  value={projectCode}
                  onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectCodeInput'), 'input')}
                  onChange={(event: any) => setProjectCode(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="ProjectNameInput">
                <label className="form-label" htmlFor="projectName">
                  Project Name
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={projectName}
                  onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectNameInput'), 'input')}
                  onChange={(event: any) => setProjectName(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="ProjectModelDropdown">
                <label className="form-label" htmlFor="projectModel">
                  Project Model
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="projectModel"
                    value={projectModel}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select')}
                    onChange={(event: any) => setProjectModel(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="Waterfall">Waterfall</option>
                    <option value="Kanban">Kanban</option>
                    <option value="Scrum">Scrum</option>
                    <option value="Agile">Agile</option>
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="MarketInput">
                <label className="form-label" htmlFor="projectMarket">
                  Market
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="projectMarket"
                    value={projectMarket}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketInput'), 'select')}
                    onChange={(event: any) => { console.log(projectMarket); setProjectMarket(event.target.value) }}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.id.toString()}>{market.marketName}</option>)}
                  </select>
                <div className="error"></div>
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
              <div className="col-md-6 form-group" id="ProgramManager">
                <label className="form-label" htmlFor="programManager">
                  Program Manager
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="programManager"
                  value={programManager}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('ProgramManager'), 'input')}
                  onChange={(event: any) => setProgramManager(event.target.value)}
                />
                <div className="error"></div>
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
      </Modal>
    </>
  );
}

const UpdateModal = (props: any) => {
  const dispatch = useDispatch();
  const marketList = useSelector((state: any) => state.Market.data);
  const [formValues, setFormValues] = useState(props.initialValues || {});
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      pkProjectID: formValues.pkProjectID,
      projectCode: formValues.projectCode,
      projectName: formValues.projectName,
      projectModel: formValues.projectModel,
      expenseType: formValues.expenseType,
      fkMarketID: formValues.fkMarketID == "0" ? 0 : Number(formValues.fkMarketID),
      programManager: formValues.programManager,
      isActive: formValues.isActive == "2" ? "0" : "1",
      updatedBy: "Admin",
    };
    try {
      validateForm('#UpdateProjectForm');
      const response = await fetch(`http://10.147.172.18:9190/api/v1/Projects/UpdateProjects`, {
        method: "PUT",
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
          props.closeModal();
          toast.success("Project Updated Successfully")
        } else toast.error(dataResponse[0].errorMessage);
      } else toast.error("Some Error occured.");
    } catch {
      toast.error("Some Error occured.");
    }
  };


  const handleChange = (e: any) => {
    console.log("Update")
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Update Project
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Project</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="UpdateProjectForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="ProjectCodeInput">
                <label className="form-label" htmlFor="projectCode">
                  Project Code
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  name="projectCode"
                  className="form-control"
                  id="projectCode"
                  value={formValues.projectCode}
                  onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectCodeInput'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="ProjectNameInput">
                <label className="form-label" htmlFor="projectName">
                  Project Name
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  name="projectName"
                  className="form-control"
                  id="projectName"
                  value={formValues.projectName}
                  onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectNameInput'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="ProjectModelDropdown">
                <label className="form-label" htmlFor="projectModel">
                  Project Model
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    name="projectModel"
                    className="form-control"
                    id="projectModel"
                    value={formValues.projectModel}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select')}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    <option value="Waterfall">Waterfall</option>
                    <option value="Kanban">Kanban</option>
                    <option value="Scrum">Scrum</option>
                    <option value="Agile">Agile</option>
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="MarketInput">
                <label className="form-label" htmlFor="projectMarket">
                  Market
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    name="fkMarketID"
                    className="form-control"
                    id="projectMarket"
                    value={formValues.fkMarketID}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketInput'),'select')}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.id.toString()}>{market.marketName}</option>)}
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="expenseType">
                  Expense Type
                </label>
                <div className="dropdown">
                  <select
                    name="expenseType"
                    className="form-control"
                    id="expenseType"
                    value={formValues.expenseType}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    <option value="CAPEX">CAPEX</option>
                    <option value="OPEX">OPEX</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group" id="ProgramManager">
                <label className="form-label" htmlFor="programManager">
                  Program Manager
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  name="programManager"
                  type="text"
                  className="form-control"
                  id="programManager"
                  value={formValues.programManager}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('ProgramManager'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group ">
                <label className="form-label">Status</label>
                <div className="dropdown">
                  <select
                    name="isActive"
                    className="form-control"
                    id="statusDropdown"
                    value={formValues.isActive}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    <option value="1">Active</option>
                    <option value="2">InActive</option>
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
      </Modal>
    </>
  );
}

export default ProjectInfo;
