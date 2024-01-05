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
import { Base_URL, DELETE_PROJECT, GET_ALL_MARKETS, GET_ALL_PROJECTS, POST_BULK_UPLOAD_PROJECTS, POST_PROJECT, UPDATE_PROJECT } from "../../constants";
import { PatternsAndMessages } from "../../utils/ValidationPatternAndMessage";
import { RotatingLines } from "react-loader-spinner";
import { closeNav } from "../../SideBar/SideBarJs";
import { read, utils, writeFile } from "xlsx";

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
    selector: (row: { projectModel: any }) => row.projectModel,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Market",
    selector: (row: { projectMarket: any }) => row.projectMarket ,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Manager",
    selector: (row: { programManager: any }) => row.programManager,
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
    selector: (row: { status: any }) => row.status,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Created Date",
    selector: (row: { createdDateString: any }) => row.createdDateString,
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
    selector: (row: { updatedDateString: any }) => row.updatedDateString,
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
  {'name':'Project Code','selector':'projectCode','default':'true'},
  {'name':'Project Name','selector':'projectName','default':'true'},
  {'name':'Project Model','selector':'projectModel','default':'true'},
  {'name':'Project Market','selector':'projectMarket','default':'true'},
  {'name':'Project Manager','selector':'programManager','default':'true'},
  {'name':'Expense Type','selector': 'expenseType', 'default':'true'},
  {'name':'Status','selector':'status','default':'true'},
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
  const username=useSelector((state:any)=>state.User.username);
  const expenseTypes = [
    { label: "CAPEX", value: "CAPEX" },
    { label: "OPEX", value: "OPEX" },
  ];
  const status = useSelector((state: any) => state.Filters.status);
  const projectModels = [
    { label: "Waterfall", value: "Waterfall" },
    // { label: "Kanban", value: "Kanban" },
    // { label: "Scrum", value: "Scrum" },
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
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState("Add");
  const [updateProjectDetails, setUpdateProjectDetails] = useState({});
  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }
  
  useEffect(()=>{
    dispatch(projectActions.clearFilters());
    dispatch(projectActions.changeStatus([{label:'Active', value:'Active'}]));
  },[])

  const getProjectDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECTS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, createdDate: row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(projectActions.changeData(dataGet));
    setTimeout(()=>setIsLoading(false), 2000);
  };
  useEffect(() => {
    getProjectDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
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

          if ((!statusSelected.length ) || (statusSelected.length > 0 && statusOptions.includes(project.status))) {
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
    let data = { ...row}
    console.log(data);
    setUpdateProjectDetails(data);
  };
  
const onSave = (props: any) => {
  console.log(props);
}
  
const [path, setPath] = useState("");
const sendBulkProjectsData = async (payload: any) => {
  let projects:any[]=[];
  let availableMarkets: any[] =[];
  let availableMarketIds: any[] =[];
  marketList.map((market: any)=>{
    availableMarkets.push( market.marketName);
    availableMarketIds.push(market.id);
  })
  let unavailableMarkets: any[] =[];
  for(const p of payload){
    if(availableMarkets.indexOf((p["Project Market"])?.trim())=== -1){
      unavailableMarkets.push(p);
    }else{

        let project = {
          projectCode: p["Project Code"],
          projectName: p["Project Name"],
          projectModel: p["Project Model"],
          expenseType: p["Expense Type"],
          marketId: availableMarketIds[availableMarkets.indexOf(p["Project Market"]?.trim())] ,
          programManager: p["Project Manager"] == null ? "":p["Project Manager"],
          createdBy: username
        };
      projects.push(project);  
    }
    // if(unavailableMarkets.length){
    //   if (window.confirm(`Update ${unavailableMarkets.length} records.`)) {
    //     // txt = "You pressed OK!";
    //     // handleDelete();
    //   } else {
    //     // Send the Post request for bulk upload
    //   }
    // }else{

    // }
  }

  try {
    const response = await fetch(`${POST_BULK_UPLOAD_PROJECTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projects),
    });
    const dataResponse = await response.json();
    if (dataResponse.length) {
      if (dataResponse[0].statusCode == "201") {
        console.log(dataResponse[0].statusReason);
        console.log(dataResponse[0].recordsCreated);
        if(unavailableMarkets.length){
          // toast.success(`Projects Added, failed to add ${unavailableMarkets.length} projects with invalid market`)
        }else{
          toast.success(`Projects Added Successfully`)
        }
      } else toast.error(dataResponse[0].errorMessage);
    } else toast.error("Some Error occured.");
  
} catch {
  toast.error("Some Error occured.");
}
  getProjectDetails();
};
  //start constants for export
  const title = "Project Details";
  const selectors = ['projectCode', 'projectName', 'projectModel',
    'projectMarket', 'programManager', 'expenseType',
    'isActive', 'createdDate', 'createdBy'];
  //end constants for export
  const projectColumns = [
    ["Project Code", "Project Name", "Project Model", "Project Market", "Expense Type", "Project Manager"],
  ];
  const handleDownloadTemplate = async () => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, projectColumns);
    utils.book_append_sheet(wb, ws, "Project Template");
    writeFile(wb, "Project.xlsx");
  };
  
  const handleUploadProjectFile = async (event: any) => {
    console.log("Calling Handle Upload: ", event);
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          sendBulkProjectsData(rows);
          setPath("");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <div>
      <SideBar></SideBar>
      {isLoading ? <div className="SpinnerLoader" style={{height:'110vh',textAlign:'center', justifyContent:'center', margin:'auto', display:'flex'}}>
        <RotatingLines
          strokeColor="#fa600d"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div> :
      <div className="col-md-12 bg-mainclass" onClick={closeNav}>
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Project Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Project Details</span>
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
              {/* {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateProjectDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />} */}

            </div>
            
            <div className="btns employee" style={{marginLeft:"12px"}}>
              <div style={{display:'flex', width:'220px',marginTop:'-15px',float:'right'}}>
              <div className="DownloadEmployeeTemplate"  >
                <button  type="button" className="btn btn-primary download-button-btn" onClick={handleDownloadTemplate}>
                  <i className="las la-file-download"></i>
                </button>
                <div className="DownloadEmployeeTemplateTooltip" >
                  <p>
                    Download Template
                  </p>
                </div>
              </div>
              <div className="UploadBulkEmployeeDetails"  >
                <button  type="button" className="btn btn-primary upload-button-btn">
                  <i className="las la-file-upload"></i>
                </button>
                <input
                  type="file"
                  value=""
                  id="input-resources-file"
                  className="btn btn-primary custom-file-input upload-input-btn"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={handleUploadProjectFile}
                />
                <div className="BulkUploadEmployeeTooltip">
                  <p>
                    Add Bulk Projects
                  </p>
                </div>
              </div>
              <div className="AddEmployeeButton" style={{whiteSpace:'nowrap'}}>
                {/* {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
                {action == "Update" && <UpdateModal initialValues={()=>{}} onSave={onSave} showModal={showModal} openModal={openModal} closeModal={closeModal} />} */}
                              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateProjectDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              </div>
              </div>
            </div>
          </div>
          <div className="row filter-row" >
            <div className="col-md-2 form-group" style={{ whiteSpace:'nowrap' }}>
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
            <div className="col-md-2 form-group" style={{ whiteSpace:'nowrap' }}>
              <label htmlFor="" className="form-label">
                Project Market
              </label>
              <MultiSelect
                options={(marketList.filter((market:any) => market.status === "Active" ).map((market: any) => ({ label: market.marketName, value: market.marketName })))}
                value={marketSelected}
                onChange={(event: any) => dispatch(projectActions.changeMarket(event))}
                labelledBy="Select Market"
                valueRenderer={customValueRenderer}
              />
            </div>

            <div className="col-md-2 form-group" style={{ whiteSpace:'nowrap' }}>
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
            <div className=" col-md-2 form-group" style={{ whiteSpace:'nowrap' }}>
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
            <div className="col-md-2 form-group" style={{ marginTop: "24px", marginLeft:'-3px', whiteSpace:'nowrap'  }}>
              <button type="button" className="btn btn-primary PAllocationFilters" onClick={() => dispatch(projectActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table columnsAndSelectors={columnsAndSelectors} defaultSortAsc={true} defaultSortFieldId={2} columns={columns} isLoading={isLoading} data={filteredProjects} onRowDoubleClicked={handleRowDoubleClicked} title={title}/>
          </div>
        </div>
      </div>}
    </div>
  );
};

const AddModal = (props: any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const marketList = useSelector((state: any) => state.Market.data);
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectModel, setProjectModel] = useState("0");
  const [projectMarket, setProjectMarket] = useState("0");
  const [expenseType, setExpenseType] = useState("0");
  const [programManager, setProgramManager] = useState("");

  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
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
      marketId: projectMarket,
      programManager: programManager,
      createdBy: username
    };
    try {
      if(validateForm('#AddProjectForm')){
        const response = await fetch(`${POST_PROJECT}`, {
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
      }
    } catch {
      toast.error("Some Error occured.");
    }
  };

  return (
    <>
      <Button
        className="btn btn-primary"
style={{ float: "right", marginTop: "-68px"}}
        
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
                  pattern={PatternsAndMessages.alphanumeric.pattern}
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
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select')}
                    onChange={(event: any) => {setProjectModel(event.target.value);
                      validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select');
                    }}
                  >
                    <option value="0">Select</option>
                    <option value="Waterfall">Waterfall</option>
                    {/* <option value="Kanban">Kanban</option>
                    <option value="Scrum">Scrum</option> */}
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
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketInput'), 'select')}
                    onChange={(event: any) => { 
                      setProjectMarket(event.target.value);
                      validateSingleFormGroup(document.getElementById('MarketInput'), 'select');
                     }}
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
                  Project Manager
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  // required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  type="text"
                  className="form-control"
                  id="programManager"
                  value={programManager}
                  // onBlur = {()=>validateSingleFormGroup(document.getElementById('ProgramManager'), 'input')}
                  onChange={(event: any) => setProgramManager(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>

            </div>
            <div className="row"  style={{marginTop:'5px'}}>
              <div className="col-md-8">
                
              </div>
              <div className="col-md-4" >
              <button type="reset" onClick={resetFormFields} className="btn btn-primary resetButton" >
                  Reset
              </button>
              <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
                  Add
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
  const username=useSelector((state:any)=>state.User.username);
  const marketList = useSelector((state: any) => state.Market.data);
  const [formValues, setFormValues] = useState(props.initialValues || {});
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    console.log("Program Manager in Form:", formValues.programManager);
    let payload = {
      id: formValues.id,
      projectCode: formValues.projectCode,
      projectName: formValues.projectName,
      projectModel: formValues.projectModel,
      expenseType: formValues.expenseType,
      marketId: formValues.marketId ,
      programManager: formValues.programManager !== null ? formValues.programManager : "",
      status: formValues.status,
      updatedBy: username,
    };
    try {
      if(validateForm('#UpdateProjectForm')){
        const response = await fetch(`${UPDATE_PROJECT}`, {
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
      }
    } catch {
      toast.error("Some Error occured.");
    }
  };

  const getProjectDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECTS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, createdDate: row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(projectActions.changeData(dataGet));
  };

  function deleteConfirmation() {
    var txt;
    if (window.confirm(`Do you want to delete this record?`)) {
      txt = "You pressed OK!";
      handleDelete();
    } else {
      txt = "You pressed Cancel!";
    }
  }
  const handleDelete = async()=>{
    // id: formValues.id,
    const response = await fetch(`${DELETE_PROJECT}/${formValues.id}`);
    getProjectDetails();
    props.closeModal();
  }
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
style={{ float: "right", marginTop: "-68px"}}
        
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
                  pattern={PatternsAndMessages.alphanumeric.pattern}
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
                    required
                    className="form-control"
                    id="projectModel"
                    value={formValues.projectModel}
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select')}
                    onChange={(e: any) => {
                      handleChange(e);
                      validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select');
                    }}
                  >
                    <option value="0">Select</option>
                    <option value="Waterfall">Waterfall</option>
                    {/* <option value="Kanban">Kanban</option>
                    <option value="Scrum">Scrum</option> */}
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
                    name="marketId"
                    className="form-control"
                    id="projectMarket"
                    value={formValues.marketId}
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketInput'),'select')}
                    onChange={(e: any) => {handleChange(e);
                      validateSingleFormGroup(document.getElementById('MarketInput'),'select');
                    }}
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
                  Project Manager
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  // required
                  name="programManager"
                  type="text"
                  className="form-control"
                  id="programManager"
                  value={formValues.programManager}
                  // onBlur = {()=>validateSingleFormGroup(document.getElementById('ProgramManager'), 'input')}
                  onChange={handleChange}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group ">
                <label className="form-label">Status</label>
                <div className="dropdown">
                  <select
                    name="status"
                    className="form-control"
                    id="statusDropdown"
                    value={formValues.status}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                    <option value="InActive">InActive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                
              </div>
              <div className="col-md-4" >
              <button  type="button" onClick={deleteConfirmation} className="btn btn-primary" style={{ float: "right" }}>
                  Delete
              </button>
              <button type="submit" className="btn btn-primary updateButton" >
                  Update
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
