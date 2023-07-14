import SideBar from "../SideBar/SideBar";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Table from "../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import "./ProjectAllocation.css";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { projectAllocationActions } from "../Store/Slices/ProjectAllocation";
import { employeeActions } from "../Store/Slices/Employee";
import { projectActions } from "../Store/Slices/Project";
import { marketActions } from "../Store/Slices/Market";
import { toast } from "react-toastify";
import { filterActions } from "../Store/Slices/Filters";
import { holidayActions } from "../Store/Slices/Holiday";
import DownloadBtn from "../Export/DownloadBtn";
import { validateForm, validateSingleFormGroup } from "../utils/validations";
import { PatternsAndMessages } from "../utils/ValidationPatternAndMessage";
import { DELETE_ALLOCATION, GET_ALL_HOLIDAYS, GET_ALL_LOCATIONS, GET_ALL_MARKETS, GET_ALL_PROJECTS, GET_ALL_PROJECT_ALLOCATIONS, GET_ALL_RESOURCES, GET_ALL_SUB_LOCATIONS, GET_TOTAL_ALLOCATED_PERCENTAGE, GET_TOTAL_PTO_DAYS, POST_PROJECT_ALLOCATION, UPDATE_PROJECT_ALLOCATION } from "../constants";
import { PassThrough } from "stream";
import { RotatingLines } from "react-loader-spinner";
import DataTable from "react-data-table-component";
import customStyles from "../DataTable/customStyles";
import { ptoActions } from "../Store/Slices/Pto";
import { closeNav } from "../SideBar/SideBarJs";



const stringDateSorting = (rowA: any, rowB: any) => {
  const a = rowA.startDate?.slice(0,10);
  const b = rowB.startDate?.slice(0,10);
  if (a.slice(6,10) > b.slice(6,10)) {
      return 1;
  }else if(a.slice(6,10) === b.slice(6,10)){
    if(a.slice(0,2) > b.slice(0,2)){
      return 1;
    }else if(a.slice(0,2) === b.slice(0,2)){
      if(a.slice(2,4) > b.slice(2,4)){
        return 1;
      }else{
        return -1;
      }
    }else{
      return -1;
    }
  }else{
    return -1;
  }
  return 0;
};

const employeeColumns = [
  {
    name: "Resource",
    selector: (row: { resourceName: any }) => row.resourceName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Type",
    selector: (row: { resourceType: any }) => row.resourceType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Role",
    selector: (row: { role: any }) => row.role,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Supervisor",
    selector: (row: { resourceManager: any }) => row.resourceManager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Location",
    selector: (row: { location: any }) => row.location,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Market",
    selector: (row: { resourceMarket: any }) => row.resourceMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
];

const projectColumns = [
  {
    name: "Project Name",
    selector: (row:  any ) => row.projectName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Code",
    selector: (row:  any ) => row.projectCode,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Market",
    selector: (row:  any ) => row.projectMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Manager",
    selector: (row:  any ) => row.projectManager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Expense Type",
    selector: (row:  any )  => row.projectExpenseType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
]
const allocationDetailsColumn = [
    {
    name: "Start Date",
    selector: (row:  any ) => row.startDate?.slice(0, 10),
    sortable: true,
    sortFunction: stringDateSorting,
    reorder: true,
    filterable: true,
  },
  {
    name: "End Date",
    selector: (row:  any ) => row.enddDate?.slice(0, 10),
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Project Role",
    selector: (row:any ) => row.resourceType1,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "PTO Days",
    selector: (row:  any ) => row.numberOfPTODays,
    sortable: true,
    reorder: true,
    filterable: true,
  },

  
  {
    name: "Holidays",
    selector: (row:  any ) => row.numberOfHolidays,
    sortable: true,
    reorder: true,
    filterable: true,
  },

  {
    name: "Allocation(Hours)",
    selector: (row:  any ) => row.allocationHours,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  // allocationPercentage
  {
    name: "Allocation Percentage",
    selector: (row: any)=> row.allocationPercentage,
    sortable:true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Status",
    selector: (row:  any ) => row.status,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Created Date",
    selector: (row:  any ) => row.createdDate,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Created By",
    selector: (row:  any ) => row.createdBy,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Updated Date",
    selector: (row:  any ) => row.updatedDateString,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Updated By",
    selector: (row:  any ) => row.updatedBy,
    sortable: true,
    reorder: true,
    filterable: true,
  },
]
const columnsAndSelectors=[
  {'name':'Resource','selector':'resourceName','default':'true'},
  {'name':'Resource Type','selector':'resourceType','default':'true'},
  {'name':'Role','selector':'role','default':'true'},
  {'name':'Supervisor','selector':'resourceManager','default':'true'},
  {'name':'Location','selector':'location','default':'true'},
  {'name':'Resource Market','selector':'resourceMarket','default':'true'},
  // {'name':'Project','selector':'projectName','default':'true'},
  // {'name':'Project Role','selector':'resourceType1','default':'false'},
  // {'name':'Project Market','selector':'projectMarket','default':'false'},
  // {'name':'Project Code','selector':'projectCode','default':'false'},
  // {'name':'Expense Type','selector':'expenseType','default':'false'},
  // {'name':'Start Date','selector':'startDate','default':'true'},
  // {'name':'End Date','selector':'enddDate','default':'true'},
  // {'name':'PTO Days','selector':'numberOfPTODays','default':'true'},
  // {'name':'Allocation(Hours)','selector':'allocationHours','default':'true'},
  // {'name':'Status','selector':'status','default':'false'},
  // {'name':'Created Date','selector':'createdDate','default':'false'},
  // {'name':'Created By','selector':'createdBy','default':'false'},
  // {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  // {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},
]


const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};

const ProjectAllocation = () => {
  const expenseTypes = [
    { label: "CAPEX", value: "CAPEX" },
    { label: "OPEX", value: "OPEX" },
  ];
  const dispatch = useDispatch();
  const marketList = useSelector((state: any) => state.Market.data);
  const locations = useSelector((state: any) => state.Filters.locations);
  const roles = useSelector((state: any) => state.Filters.roles);
  const resourceTypes = useSelector((state: any) => state.Filters.resourceTypes);
  const toggle = useSelector((store: any) => store.ProjectAllocation.toggle);
  const projectAllocations = useSelector((store: any) => store.ProjectAllocation.data);
  const resourceMarketSelected = useSelector((store: any) => store.ProjectAllocation.resourceMarket)
  const resourceTypeSelected = useSelector((store: any) => store.ProjectAllocation.resourceType)
  const roleSelected = useSelector((store: any) => store.ProjectAllocation.role)
  const projectMarketSelected = useSelector((store: any) => store.ProjectAllocation.projectMarket)
  const [isLoading, setIsLoading] = useState(true);
  const expenseTypeSelected = useSelector((store: any) => store.ProjectAllocation.expenseType)
  const locationSelected = useSelector((store: any) => store.ProjectAllocation.location)
  const [currentProject, setCurrentProject] = useState(null);
  const [closeExpanded, setCloseExpanded] = useState(true);
  const [currentRow, setCurrentRow] = useState(null);
  const resources = useSelector((state: any) => state.Employee.data);
  const status = useSelector((state: any) => state.Filters.status);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updateProjectDetails, setUpdateProjectDetails] = useState({});
  const resourceSelected = useSelector((state: any) => state.Pto.resourceName);
  const resourceList = useSelector((state: any) => state.Employee.data);
  const managerSelected = useSelector((state: any) => state.Employee.manager);
  const managerOptions = managerSelected.map((manager: any) => manager.value);
  const statusSelected = useSelector((state: any) => state.ProjectAllocation.status);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }

  
  useEffect(()=>{
    dispatch(employeeActions.clearFilters());
    dispatch(ptoActions.clearFilters());
    dispatch(projectAllocationActions.clearFilters());
    dispatch(projectAllocationActions.changeStatus([{label:'Active', value:'Active'}]));
  },[])
  const changeManagerSelectHandler = (event: any) => {
    dispatch(employeeActions.changeManager(event));
  };
  const changeResourceMarketSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeResourceMarket(event));
  };
  const changeResourceTypeSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeResourceType(event));

  };
  const changeRoleSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeRole(event));

  };

  const changeProjectMarketSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeProjectMarket(event));

  };
  const changeExpenseTypeSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeExpenseType(event));

  };
  const changeLocationSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeLocation(event.target.value));

  };

  const changeStatusSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeStatus(event));
  };

  const getProjectAllocationDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECT_ALLOCATIONS}`);
    let dataGet = await response.json();
    dataGet=dataGet.map((row:any)=>({...row,startDate:row.startDate?.slice(0,10) ,enddDate:row.enddDate?.slice(0,10),updatedDate : row.updatedDate?.slice(0,10),createdDate:row.createdDate?.slice(0,10)}))
    dispatch(projectAllocationActions.changeData(dataGet));
    setTimeout(()=>setIsLoading(false), 2000);
  };
  useEffect(() => {
    getProjectAllocationDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(marketActions.changeData(dataGet));
  };
  const getHolidayDetails = async () => {
    const response = await fetch(`${GET_ALL_HOLIDAYS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(holidayActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
    getHolidayDetails();
  }, []);

  const supervisors: any = [];
  resources.map((resource: any) => {
    if (supervisors.indexOf(resource.manager) === -1) {
      supervisors.push(resource.manager);
    }
  })
  const filteredProjectAllocations = projectAllocations.filter((projectAllocation: any) => {
    const resourceMarketOptions = resourceMarketSelected.map((resourceMarket: any) => resourceMarket.value);
    const resourceTypeOptions = resourceTypeSelected.map((resourceType: any) => resourceType.value);
    const roleOptions = roleSelected.map((role: any) => role.value);
    const resourceOptions = resourceSelected.map((resource: any) => resource.value);
    const statusOptions = statusSelected.map((status: any) => status.value);
    const projectMarketOptions = projectMarketSelected.map((projectMarket: any) => projectMarket.value);
    const expenseTypeOptions = expenseTypeSelected.map((expenseType: any) => expenseType.value);
    if ((!resourceMarketSelected.length) || (resourceMarketSelected.length > 0 && resourceMarketOptions.includes(projectAllocation.resourceMarket) == true)) {
      if ((!resourceTypeSelected.length) || (resourceTypeSelected.length > 0 && resourceTypeOptions.includes(projectAllocation.resourceType) == true)) {
        if ((!roleSelected.length) || (roleSelected.length > 0 && roleOptions.includes(projectAllocation.role) == true)) {
          if ((!resourceSelected.length) || (resourceSelected.length > 0 && resourceOptions.includes(projectAllocation.resourceName) == true)) {
            if ((!managerSelected.length) || (managerSelected.length > 0 && managerOptions.includes(projectAllocation.resourceManager) == true)) {
              if ((!expenseTypeSelected.length) || (expenseTypeSelected.length > 0 && expenseTypeOptions.includes(projectAllocation.expenseType) == true)) {              
                    if((!projectMarketSelected.length) || (projectMarketSelected.length > 0 && projectMarketOptions.includes(projectAllocation.projectMarket))){
                          if ((!statusSelected.length ) || (statusSelected.length > 0 && statusOptions.includes(projectAllocation.status))) {
                            if (locationSelected == "0" || locationSelected == projectAllocation.location){
                              if((startDate == null) ? true : new Date(projectAllocation.startDate) >= startDate){
                                if((endDate == null) ? true : new Date(projectAllocation.enddDate) <= endDate){
                                  // if(projectAllocation.status==="Active")
                                  return true;         
                                }
                              }
                            }
                        }
                    }
                }
            }
          }
        }
      }
    }
    return false;
  });
let resourceIds: any[]=[];
let newData : any[]=[];

const [isFilterVisible, setIsFilterVisible] = useState(false);
const showMoreFilters = () =>{
  let moreFilters = document.getElementById('MoreFilters');
  if(!isFilterVisible){
    moreFilters?.setAttribute('style', 'display:"visible"')
    setIsFilterVisible(true);
    let mfButton = document.getElementById('MoreFiltersButton')
    if(mfButton!= null){
      mfButton.innerHTML = " Hide Filters "
    }
  }else{
    moreFilters?.setAttribute('style', 'display:none')
    setIsFilterVisible(false);
    let mfButton = document.getElementById('MoreFiltersButton')
    if(mfButton!= null){
      mfButton.textContent = "More Filters"
    }
  }
}

filteredProjectAllocations.map((projectAllocation:any)=>{
 //console.log("Project Allocation: ",projectAllocation);
 if(resourceIds.includes(projectAllocation.resourceId)==true){
     let resourceItem=newData.find((resource:any)=>resource.resourceId==projectAllocation.resourceId)
      
     let projectAllocationsInfo: any[]=[];
     let projectAllocationInfo = {
       id: projectAllocation.id,
       startDate: projectAllocation.startDateString,
       enddDate: projectAllocation.enddDateString,
       allocationHours: projectAllocation.allocationHours,
       numberOfPTODays: projectAllocation.numberOfPTODays,
       numberOfHolidays: projectAllocation.numberOfHolidays,
       resourceType1 : projectAllocation.resourceType1,
       allocationPercentage: projectAllocation.allocationPercentage,
       status: projectAllocation.status,
       createdDate: projectAllocation.createdDateString,
       createdBy: projectAllocation.createdBy,
       updatedDateString: projectAllocation.updatedDateString,
       updatedBy: projectAllocation.updatedBy,
       resourceId: projectAllocation.resourceId,
       projectId: projectAllocation.projectId,
     }
     //console.log("Project Infos: ", resourceItem.projectsInfo);
     if(!resourceItem.projectsInfo.find((pi: any)=>pi.projectId == projectAllocation.projectId)){
       projectAllocationsInfo.push(projectAllocationInfo);
       let projectInfo = {
         projectCode:projectAllocation.projectCode,
         projectId : projectAllocation.projectId,
         projectMarket: projectAllocation.projectMarket,
         projectExpenseType: projectAllocation.expenseType,
         projectAllocationsInfo:projectAllocationsInfo,
         projectName: projectAllocation.projectName !== null ? projectAllocation.projectName : null,
         projectManager: projectAllocation.programManager !== null ? projectAllocation.programManager : null,
       }
       resourceItem.projectsInfo.push(projectInfo);

     }else{
       resourceItem.projectsInfo.find((project: any)=>project.projectId == projectAllocation.projectId).projectAllocationsInfo.push(projectAllocationInfo);
     }
  }
 if(resourceIds.includes(projectAllocation.resourceId)==false){
   resourceIds.push(projectAllocation.resourceId);
   let projectsInfo: any[]=[];
   let projectAllocationsInfo: any[]=[];
   let projectAllocationInfo = {
     id: projectAllocation.id,
     startDate: projectAllocation.startDateString,
     enddDate: projectAllocation.enddDateString,
     allocationHours: projectAllocation.allocationHours,
     numberOfPTODays: projectAllocation.numberOfPTODays,
      numberOfHolidays: projectAllocation.numberOfHolidays,
     resourceType1 : projectAllocation.resourceType1,
     allocationPercentage: projectAllocation.allocationPercentage,
     status: projectAllocation.status,
     createdDate: projectAllocation.createdDateString,
     createdBy: projectAllocation.createdBy,
     updatedDateString: projectAllocation.updatedDateString,
     updatedBy: projectAllocation.updatedBy,
     resourceId: projectAllocation.resourceId,
     projectId: projectAllocation.projectId,
   }
   // : any[]=[];
   projectAllocationsInfo.push(projectAllocationInfo);
   let projectInfo={
   projectCode:projectAllocation.projectCode,
   projectId : projectAllocation.projectId,
   projectMarket: projectAllocation.projectMarket,
   projectExpenseType: projectAllocation.expenseType,
   projectAllocationsInfo: projectAllocationsInfo,
   projectName: projectAllocation.projectName !== null ? projectAllocation.projectName : null,
    projectManager: projectAllocation.programManager,
 }
   projectsInfo.push(projectInfo); 
   let newResourceItem={
   resourceId : projectAllocation.resourceId,
   resourceName : projectAllocation.resourceName,
   role : projectAllocation.role,
   resourceType : projectAllocation.resourceType,
   resourceManager : projectAllocation.resourceManager,
   location : projectAllocation.location,
   subLocation : projectAllocation.subLocation,
   resourceMarket : projectAllocation.resourceMarket,
   projectsInfo : projectsInfo
 }
   newData.push(newResourceItem);
 }
})

  //start constants for export
  const title ="Project Allocation Details";
  const headers = [['Resource', 'Resource Type', 'Location',
    'Project', 'Project Market', 'Start Date', 'End Date', 'PTO Days', 'Allocation(Hours)']];
  const selectors = ['resourceName', 'resourceType',
    'location', 'projectName', 'projectMarket',
    'startDate', 'enddDate', 'pTODays', 'allocationHours']
  //end constants for export

  const handleRowDoubleClicked = (row: any) => {
    setShowModal(true);
    setAction("Update");
    let data = { ...row }
    setUpdateProjectDetails(data);
    //console.log("Project Allocation: ", row);
  };

  const ExpandableAllocationDetails = (allocationData: any)=>{
    //console.log("Passed Allocation Data: ", allocationData.data.projectAllocationsInfo);
    return <div className="projectAllocationChild" style={{margin:'10px', border:'rgba(0, 0, 0, 0.12) 1px solid', boxSizing:'content-box', width:'89.4vw',overflow:'hidden'}}>
      <DataTable 
        customStyles={customStyles} 
        defaultSortFieldId={1}
        defaultSortAsc={false}
        onRowDoubleClicked={handleRowDoubleClicked}
        striped={true}
        pagination 
        columns={allocationDetailsColumn} 
        data={allocationData.data.projectAllocationsInfo}/>
    </div>;
  }
  const ExpandableEmployee = ( resourceData: any ) => {
    // //console.log("Passed Project Data: ", resourceData.data.projectsInfo);
    return <div className="projectChild" style={{margin:'10px', border:'rgba(0, 0, 0, 0.12) 1px solid'}}>
      <DataTable 
        columns={projectColumns} 
        defaultSortFieldId={1}
        expandableRows
        customStyles={customStyles}
        striped={true}
        expandableRowExpanded={(row: any) => closeExpanded && (row.projectId === currentProject) }
        expandOnRowClicked
        onRowClicked={(row) => {setCurrentProject(row.projectId); setCloseExpanded(true)}}
        onRowExpandToggled={(bool, row: any) => {setCurrentProject(row.projectId); setCloseExpanded(true)}}
        expandableRowsComponent={ExpandableAllocationDetails}
        data={resourceData.data.projectsInfo}/>
    </div>;
}

  return (
   <div>
      <SideBar></SideBar>
      <>{
        isLoading ? <div className="SpinnerLoader" style={{height:'110vh',textAlign:'center', justifyContent:'center', margin:'auto', display:'flex'}}>
        <RotatingLines
          strokeColor="#fa600d"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div> : 
      <div className="col-md-12 bg-mainclass" onClick={closeNav} >
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Project Allocation</h1>
            <div className="btns project-allocation">
              {/* <button type="button" className="btn btn-primary upload-button-btn" style={{ marginRight: "200px" }}>
                <i className="las la-file-upload"></i>
              </button>
              <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ marginRight: "200px" }}
              /> */}
              {/* <AddModal /> */}
              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateProjectDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}

            </div>
          </div>
        </div>
        {/* <div className="row"> */}
        {/* <div className="col-md-10" > */}
        <div className="row filter-row">
          <div className="col-md-2 form-group">
                <label htmlFor="" className="form-label">
                  Resource
                </label>
                <MultiSelect
                  options={
                    resourceList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => ({label: resource.resourceName, value: resource.resourceName}))
                  }
                  value={resourceSelected}
                  onChange={(event: any) => dispatch(ptoActions.changeResourceName(event))}
                  labelledBy="Select Resource"
                  valueRenderer={customValueRenderer}
                />
              </div>
            <div className="col-md-2 form-group" style={{whiteSpace:'nowrap'}}>
              <label htmlFor="" className="form-label">
                Resource Type
              </label>
              <MultiSelect
                options={resourceTypes.map((resourceType: any) => ({ label: resourceType, value: resourceType }))}
                value={resourceTypeSelected}
                onChange={changeResourceTypeSelectHandler}
                labelledBy="Select Resource Type"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Role
              </label>
              <MultiSelect
                options={roles.map((role: any) => ({ label: role, value: role }))}
                value={roleSelected}
                onChange={changeRoleSelectHandler}
                labelledBy="Select Role"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
                <label htmlFor="" className="form-label">
                  Supervisor
                </label>
                <MultiSelect
                  options={supervisors.map((manager: any) => ({ label: manager, value: manager }))}
                  value={managerSelected}
                  onChange={changeManagerSelectHandler}
                  labelledBy="Select Supervisor"
                  valueRenderer={customValueRenderer}
                />
              </div>
            <div className=" col-md-2 form-group">
              <label htmlFor="locationDropdown" className="form-label">
                Location
              </label>
              <div className="dropdown">
                <select className="form-control" value={locationSelected} onChange={changeLocationSelectHandler} id="locationDropdown">
                  <option value="0">Select</option>
                  {locations.map((location: any) => (<option key={location.locationId} value={location.locationName}>{location.locationName}</option>))}
                </select>
              </div>
            </div>
            <div className="col-md-2 form-group" style={{whiteSpace:'nowrap'}}>
              <label htmlFor="" className="form-label">
                Resource Market
              </label>
              <MultiSelect
                options={(marketList.map((market: any) => ({ label: market.marketName, value: market.marketName })))}
                value={resourceMarketSelected}
                onChange={changeResourceMarketSelectHandler}
                labelledBy="Select Resource Market"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className=" col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Status
              </label>
              <MultiSelect
                options={status.map((status: any) => ({ label: status, value: status }))}
                value={statusSelected}
                onChange={changeStatusSelectHandler}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-3 form-group" style={{marginTop:'24px', marginLeft:'-3px', whiteSpace:'nowrap' }}>
            <button type="button" className="btn btn-primary PAllocationFilters" onClick={() => {dispatch(projectAllocationActions.clearFilters()); setEndDate(null); setStartDate(null); dispatch(employeeActions.clearFilters()); dispatch(ptoActions.clearFilters())}}><span>Clear Filters</span><i className="las la-filter"></i></button>
            <button type="button" className="btn btn-primary PAllocationFilters" onClick={showMoreFilters}><span id="MoreFiltersButton">More Filters</span><i className="las la-filter"></i></button>
            </div>
            <div className="MoreFilters row filter-row" id="MoreFilters" style={{display:'none'}} >
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Project Market
              </label>
              <MultiSelect
                options={(marketList.map((market: any) => ({ label: market.marketName, value: market.marketName })))}
                value={projectMarketSelected}
                onChange={changeProjectMarketSelectHandler}
                labelledBy="Select Project Market"
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
                onChange={changeExpenseTypeSelectHandler}
                labelledBy="Select Expense Type"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-3 form-group">
              <label htmlFor="" className="form-label">
                Allocation Start Date
              </label>
                <DatePicker
                    className="form-control react-date-picker DateFilter"
                    required
                    showLeadingZeros={false}
                    name="StartDate"
                    onChange={(e: any) => setStartDate(e)}
                    value={startDate}
                    format="MM/dd/yyyy"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
            </div>
            <div className="col-md-3 form-group">
              <label htmlFor="" className="form-label">
              Allocation End Date
              </label>
              <DatePicker
                    className="form-control DateFilter"
                    required
                    name="EndDate"
                    onChange={(e: any) => setEndDate(e)}
                    value={endDate}
                    format="MM/dd/yyyy"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                  />
            </div>
            </div>
        </div>
        {/* </div> */}
        {/* <div className="col-md-2 row justify-content-around" style={{marginLeft:'-11%',width:'27%', }}>
        <div className="col-md-6" style={{ marginTop: "24px",whiteSpace:'nowrap' }}>
            
            <button type="button" className="btn btn-primary" onClick={() => {dispatch(projectAllocationActions.clearFilters()); setEndDate(null); setStartDate(null); dispatch(employeeActions.clearFilters()); dispatch(ptoActions.clearFilters())}}><span>Clear Filters</span><i className="las la-filter"></i></button>
          </div>
          <div className="col-md-6" style={{ marginTop: "24px", marginLeft:"-16%",whiteSpace:'nowrap' }}>
            <button type="button" className="btn btn-primary" onClick={showMoreFilters}><span id="MoreFiltersButton">More Filters</span><i className="las la-filter"></i></button>
          </div>
        </div> */}
        {/* </div> */}
          <div className="TableContentBorder">
            <Table columnsAndSelectors={columnsAndSelectors}    
            expandableRowExpanded={(row: any) => row.resourceId === currentRow }
            expandOnRowClicked
            onRowClicked={(row:any) => {setCurrentRow(row)}}
            onRowExpandToggled={(bool:any, row: any) => {setCurrentRow(row.resourceId);setCloseExpanded(false)}}
            expandableRows expandableRowsComponent={ExpandableEmployee} columns={employeeColumns} data={newData} title={title}/>
          </div>
      </div>
      }</>
    </div>
  );
};

const UpdateModal = (props: any) => {
  const [formValues, setFormValues] = useState(props.initialValues || { location: "0" });
  //console.log("Update Allocation: ", props);
  const username=useSelector((state:any)=>state.User.username);
  const [allocationStartDate, setAllocationStartDate] = useState<Date | null>(new Date(props.initialValues.startDate));
  const [allocationEndDate, setAllocationEndDate] = useState<Date | null>(new Date(props.initialValues.enddDate));
  const [ptoDays, setPtoDays] = useState("0");  
  const [holidays, setHolidays] = useState(0);
  const [allocationPercentage, setAllocationPercentage] = useState("0");
  const [resourceType1, setResourceType1] = useState("0");
  const [resourceId, setResourceId] = useState("0");
  const [projectId, setProjectId] = useState("0");
  const [allocatedPercentage, setAllocatedPercentage] = useState(0);
  const holidayDetails = useSelector((state: any) => state.Holiday.data);
  const [allocationHrs, setAllocationHrs] = useState("0");
  let allocationHours = 0, allocationHoursPerDay = 0;
  
  const calculateAllocationDays = (startDate: Date, endDate: Date) => {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    //console.log("AllocationDays Count " + count);
    return count;
  }
  const calculateHolidays = (location: any, subLocation: any, startDate: Date, endDate: Date) => {
    let count = 0;
    let filteredHolidays = holidayDetails.filter((holiday: any) => holiday.locationName == location && holiday.subLocationName == subLocation && holiday.status == "Active");
    //console.log("filtered holidays ," + filteredHolidays.length)
    for (let i = 0; i < filteredHolidays.length; i++) {
      let holidayDate = new Date(filteredHolidays[i].holidayDate)
      let dayOfWeek = holidayDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && startDate <= holidayDate && endDate >= holidayDate)
        count++;
    }
    //console.log("Holiday Count " + count);
    return count;
  }
  const getProjectAllocationDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECT_ALLOCATIONS}`);
    let dataGet = await response.json();
    dataGet=dataGet.map((row:any)=>({...row,startDate:row.startDate?.slice(0,10) ,enddDate:row.enddDate?.slice(0,10),updatedDate : row.updatedDate?.slice(0,10),createdDate:row.createdDate?.slice(0,10)}))
    dispatch(projectAllocationActions.changeData(dataGet));
    // setTimeout(()=>setIsLoading(false), 2000);
  };
  const dispatch = useDispatch();
  const resourcesList = useSelector((store: any) => store.Employee.data);
  const projectsList = useSelector((store: any) => store.Project.data);
  const roles = useSelector((state: any) => state.Filters.roles);
  const getEmployeeDetails = async () => {
    const response = await fetch(`${GET_ALL_RESOURCES}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive}));
    dispatch(employeeActions.changeData(dataGet));
  };
  const getLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(filterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_SUB_LOCATIONS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive}));
    dispatch(filterActions.changeSubLocations(dataGet));
  }
  useEffect(() => {
    getEmployeeDetails();
    getLocationDetails();
    getSubLocationDetails();
  }, []);
  const getProjectDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECTS}`);
    let dataGet = await response.json();
    //console.log("Project Details: ",dataGet)
    dataGet = dataGet.map((row: any) => ({ ...row, projectMarket: row.marketName, projectId: row.pkProjectID, isActive: row.status}));
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
    setResourceId(formValues.resourceId);
    setProjectId(formValues.projectId);
  }, []);
  let selectedResourceDetails = { resourceId: 0, resourceType: "", role: "", supervisor: "", location: "", resourceMarket: "", subLocation: "" };
  let selectedProjectDetails = { projectId: 0, projectMarket: "", expenseType: "", PPSID: "" }

  const setResourceDetails = (event: any) => {
    //console.log(selectedResourceDetails, event.target.value)
    setResourceId(event.target.value);
    //console.log("Set Resource Details Called: ",formValues.resourceId);
  };
  
  const setProjectDetails = (event: any) => {
    setProjectId(event.target.value);
    //console.log("SetProjectDetails Called: ",formValues.projectId);
  };

  if (formValues.resourceId == "0") {
    selectedResourceDetails = { resourceId: 0, resourceType: "", role: "", supervisor: "", location: "", resourceMarket: "", subLocation: "" };
  }
  else {
    const filteredResource = resourcesList.filter((resource: any) => resource.resourceId == Number(formValues.resourceId));
    //console.log("Resource: ",filteredResource);
    selectedResourceDetails.resourceId = filteredResource[0].resourceId
    selectedResourceDetails.resourceType = filteredResource[0].resourceType
    selectedResourceDetails.role = filteredResource[0].role
    selectedResourceDetails.supervisor = filteredResource[0].manager
    selectedResourceDetails.location = filteredResource[0].location
    selectedResourceDetails.subLocation = filteredResource[0].subLocation
    selectedResourceDetails.resourceMarket = filteredResource[0].resourceMarket
  }

  if (formValues.projectId == "0") {
    selectedProjectDetails = { projectId: 0, projectMarket: "", expenseType: "", PPSID: "" }
  }
  else {
    let filteredProject = projectsList.filter((project: any) => project.id == Number(formValues.projectId))
    // //console.log("Filtered Project Details: ", filteredProject);
    //console.log("Project List: ", projectsList);
    selectedProjectDetails.projectId = filteredProject[0].id
    selectedProjectDetails.projectMarket = filteredProject[0].projectMarket
    selectedProjectDetails.expenseType = filteredProject[0].expenseType
    selectedProjectDetails.PPSID = filteredProject[0].projectCode
  }

  if (selectedResourceDetails.resourceType == "OGS")
    allocationHoursPerDay = 8.5;
  else if (selectedResourceDetails.resourceType == "FTE" || selectedResourceDetails.resourceType == "GTM")
    allocationHoursPerDay = 8;
  else
    allocationHoursPerDay = 0;

    let allocationP =0;
    let allocationDays: number;
    let numberOfHolidays=0;
  if (formValues.resourceId != "0" && allocationEndDate != null && allocationStartDate != null) {
    let allocationDays = calculateAllocationDays(allocationStartDate, allocationEndDate) - calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
    formValues.allocationHours = ((allocationDays - Number(ptoDays =="" ? formValues.numberOfPTODays : ptoDays)) * allocationHoursPerDay * Number(formValues.allocationPercentage) / 100);
    formValues.allocationPercentage = Math.floor(100*(Number(formValues.allocationHours) / ((allocationDays - Number(ptoDays)) * allocationHoursPerDay)));
    numberOfHolidays = calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
  }
  const allPercentToHours = (event: any) =>{
    setAllocationPercentage(event.target.value);
    if(formValues.resourceId != "0" && allocationEndDate != null && allocationStartDate != null){
      let allocationDays = calculateAllocationDays(allocationStartDate, allocationEndDate) - calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
      setAllocationHrs(((allocationDays - Number(ptoDays)) * allocationHoursPerDay * Number(event.target.value) / 100).toString());
    }
  }
  const allHoursToPercent = (event: any) =>{
    setAllocationHrs(event.target.value);
    if(formValues.resourceId != "0" && allocationEndDate != null && allocationStartDate != null){
      let allocationDays = calculateAllocationDays(allocationStartDate, allocationEndDate) - calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
      setAllocationPercentage(Math.floor(100*(Number(event.target.value) / ((allocationDays - Number(ptoDays)) * allocationHoursPerDay))).toString()) ;
    }
    //console.log("Allocation Percentage after hours: ", formValues.allocationPercentage );
  }

  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
    setAllocationStartDate(null);
    setAllocationEndDate(null);
    setPtoDays("");
    setAllocationPercentage("");
    setResourceType1("0");
    setResourceId("0");
    setProjectId("0");
    setAllocationHrs("");
  }
  const getAllocationPercentage = async () => {
    let payload = {
      fkResourceID: Number(formValues.resourceId),
      startDate: allocationStartDate,
      endDate: allocationEndDate
    };
        try {
      const response = await fetch(`${GET_TOTAL_ALLOCATED_PERCENTAGE}?resourceID=${formValues.resourceId}&startDate=${allocationStartDate?.toISOString().slice(0, 10)}&endDate=${allocationEndDate?.toISOString().slice(0, 10)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const dataResponse = await response.json();
          setAllocatedPercentage(Number(dataResponse));
        }
        catch {
          //console.log("Some Error Occured")
            ;
        }
      }
  useEffect(() => {
    setAllocatedPercentage(0);
    setPtoDays("");
    if (formValues.resourceId != "0" && allocationStartDate != null && allocationEndDate != null)
      {
        getAllocationPercentage();
        getPTODays();
        let hdays = calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
        setHolidays(hdays);
    }
  }, [formValues.resourceId, allocationStartDate, allocationEndDate]);

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let paStartDate=null,paEndDate=null;
    if(allocationStartDate!=null){
      paStartDate= new Date(allocationStartDate);
      paStartDate.setDate(allocationStartDate.getDate() );
    }
    if(allocationEndDate!=null){
      paEndDate= new Date(allocationEndDate);
      paEndDate.setDate(allocationEndDate.getDate() );
    }
    let payload = {
      id: formValues.id,
      resourceId: formValues.resourceId == "0" ? 0 : Number(formValues.resourceId),
      projectId: formValues.projectId == "0" ? 0 : Number(formValues.projectId),
      resourceType1: formValues.resourceType1,
      startDate: paStartDate,
      enddDate: paEndDate,
      numberOfPTODays: ptoDays =="" ? formValues.numberOfPTODays : ptoDays,
      numberOfHolidays : numberOfHolidays,
      allocationHours: allocationHrs == "0" ? formValues.allocationHours : Number(allocationHrs),
      allocationPercentage: Number(formValues.allocationPercentage),
      status: formValues.status,
      updatedBy: username
    };
    try {
      if(validateForm('#AllocateProjectForm')){
        const response = await fetch(`${UPDATE_PROJECT_ALLOCATION}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const dataResponse = await response.json();
        if (dataResponse.length) {
          if (dataResponse[0].statusCode == "201") {
            //console.log(dataResponse[0].statusReason);
            //console.log(dataResponse[0].recordsCreated);
            dispatch(projectAllocationActions.changeToggle());
            resetFormFields();
            props.closeModal();
            toast.success("Update Allocation Successful")
          } else toast.error("Some Error occured.")
          // dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
    } catch {
      toast.error("Some Error occured.");
    }

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
    const response = await fetch(`${DELETE_ALLOCATION}/${formValues.id}`);
    getProjectAllocationDetails();
    props.closeModal();
  }
  ////console.log((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000 * 3600 * 24));
useEffect(()=>{
  getPTODays();    
  if (resourceId != "0" && allocationStartDate != null && allocationEndDate != null)
  {
    let hdays = calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
    setHolidays(hdays);
}
});
  const getPTODays = async()=>{
    //console.log("Get PTO Days called: "+ formValues.resourceId+ allocationStartDate + allocationEndDate);
    if(formValues.resourceId != "0" && allocationStartDate !== null && allocationEndDate !== null){
      if(allocationEndDate >= allocationStartDate){
        try{
          let paStartDate = new Date(allocationStartDate);
          paStartDate.setDate(paStartDate.getDate() + 1);
          let paEndDate = new Date(allocationEndDate);
          paEndDate.setDate(paEndDate.getDate()+1);
          const response = await fetch(`${GET_TOTAL_PTO_DAYS}?resourceId=${formValues.resourceId}&startDate=${paStartDate?.toISOString().slice(0, 10)}&endDate=${paEndDate?.toISOString().slice(0, 10)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          const dataResponse = await response.json();
          // //console.log()
          setPtoDays(dataResponse);
          //console.log("Data Response: "+ dataResponse);
        }catch{
          toast.error("Some Error Occured");
        }
      }
      // else{
      //   const formGroup1 = document.getElementById('AllocationStartField');
      //   const errorContainer = formGroup1?.querySelector('.error');

      //   errorContainer.textContent = "Start Date should be smaller that the End Date";
      //   // option.errorMessage(input, label);
  
      //   const formGroup2 = document.getElementById('AllocationEndField');
        
      // }
    }
  }
  const handleChange = (e: any) => {
    //console.log("Update: ",e)
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-50px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Update Allocation
      </Button>
      <Modal show={props.showModal} id="project_allocation_modal" onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Allocation</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="ModalBody">
          <form onSubmit={formSubmitHandler} id="AllocateProjectForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="AllocateProjectResource">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select 
                    className="form-control" 
                    required
                    id="resource" 
                    name="resourceId"
                    value={formValues.resourceId}
                    onChange={(e: any) => {
                      handleChange(e);
                      setResourceDetails(e);
                      validateSingleFormGroup(document.getElementById('AllocateProjectResource'), 'select');
                      }}>
                    <option value="0">Select</option>
                    {resourcesList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceType">
                  Resource Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceType"
                  name="resourceType"
                  value={selectedResourceDetails.resourceType}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <input type="text" name="role" className="form-control" id="role" value={selectedResourceDetails.role} disabled />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="supervisor">
                  Supervisor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supervisor"
                  name="superVisor"
                  value={selectedResourceDetails.supervisor}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ocation">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={selectedResourceDetails.location}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceMarket">
                  Resource Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceMarket"
                  name="resourceMarket"
                  value={selectedResourceDetails.resourceMarket}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectField">
                <label className="form-label" htmlFor="project">
                  Project
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select 
                    className="form-control" 
                    required
                    id="project"
                    name="projectId" 
                    value={formValues.projectId} 
                    onChange={(e: any) => {
                      setProjectDetails(e);
                      handleChange(e);
                      //console.log("E Value: ", e.target.value);
                      // setProjectId(e);
                      validateSingleFormGroup(document.getElementById('AllocateProjectField'), 'select');
                    }}>
                    <option value="0">Select</option>
                    {projectsList.filter((project: any) => project.status == "Active").map((project: any) => <option key={project.id} value={project.id.toString()}>{project.projectName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectResourceType">
                <label className="form-label" htmlFor="resourceType1">
                  Project Role
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    className="form-control "
                    required
                    // disabled
                    id="resourceType1Dropdown"
                    name="resourceType1"
                    value={formValues.resourceType1}
                    onChange={(event) => {
                      handleChange(event);
                      setResourceType1(event.target.value);
                      validateSingleFormGroup(document.getElementById('AllocateProjectResourceType'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {roles.map((role: any) => (<option key={role} value={role}> {role}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="project Market">
                  Project Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectMarket"
                  name="projectMarket"
                  value={
                    selectedProjectDetails.projectMarket
                  }
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ppsid">
                  PPSID
                </label>
                <input type="text" name="ppsid" className="form-control" id="ppsid" value={selectedProjectDetails.PPSID} disabled />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="capex">
                  Expense Type
                </label>
                <input type="text" name="expenseType" className="form-control" id="capex" value={selectedProjectDetails.expenseType} disabled />
              </div>
              <div className="col-md-6 form-group" id="AllocationStartField">
                <label className="form-label" htmlFor="allocationStartDate" style={{ zIndex: "9" }}>
                  Allocation Start Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  name="allocationStartDate"
                  onCalendarClose={()=>{
                    validateSingleFormGroup(document.getElementById('AllocationStartField'), 'datePicker');
                    
                  }}
                  // maxDate={formValues.enddDate !== null ? formValues.enddDate : new Date('December 31, 2100')}
                  onChange={setAllocationStartDate}
                  maxDate={allocationEndDate !== null ? allocationEndDate : new Date('December 31, 2100')}
                  value={allocationStartDate}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="AllocationEndField">
                <label className="form-label" htmlFor="allocationEndDate" style={{ zIndex: "9" }}>
                  Allocation End Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  name="allocationEndDate"
                  onCalendarClose={()=>{
                    validateSingleFormGroup(document.getElementById('AllocationEndField'), 'datePicker');
                    
                  }}
                  minDate={allocationStartDate !== null ? allocationStartDate : new Date('December 31, 2000')}
                  onChange={setAllocationEndDate}
                  value={allocationEndDate}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectPTODays">
                <label className="form-label" htmlFor="ptoDays">
                  Holidays
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  type="text"
                  disabled
                  // required
                  // pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="numberOfHolidays"
                  value={holidays}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPTODays'), 'input')}
                  // onChange={(event) => setPtoDays(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectPTODays">
                <label className="form-label" htmlFor="ptoDays">
                  PTO Days
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  type="text"
                  disabled
                  name="numberOfPTODays"
                  // required
                  // pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="ptoDays"
                  value={ptoDays =="" ? formValues.numberOfPTODays : ptoDays}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPTODays'), 'input')}
                  // onChange={(event) => setPtoDays(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectPercentage">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Percentage)
                  {allocatedPercentage != 0 && <span style={{ color: "red" }}> Allocated : {allocatedPercentage}</span>}
                </label>
                <span className="requiredField">*</span>
                <input
                  type="text"
                  required
                  name="allocationPercentage"
                  pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="allocationPercentage"
                  value={allocationPercentage == "0" ? formValues.allocationPercentage : allocationPercentage}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPercentage'), 'input')}
                  onChange={(e)=>{
                    handleChange(e);
                    allPercentToHours(e);}
                    // (event) => setAllocationPercentage(event.target.value)
                  }
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationHoursPerDay">
                  Allocation Hours Per Day
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocationHoursPerDay"
                  name="allocationHoursPerDay"
                  value={allocationHoursPerDay}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group" id="AllocationHours">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Hours)
                </label>
                <span className="requiredField">*</span>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="allocationHours"
                  name="allocationHours"
                  value={allocationHrs == "0" ? formValues.allocationHours : allocationHrs}
                  // disabled
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AllocationHours'), 'input')}
                  onChange={(e)=>{handleChange(e);allHoursToPercent(e)}}
                />
                <div className="error"></div>
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
            <div className="row" style={{marginTop:'5px'}}>
              <div className="col-md-8">
                
              </div>
              <div className="col-md-4" >
              <button  type="button" onClick={deleteConfirmation} className="btn btn-primary deleteButton">
                  Delete
              </button>
              <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const AddModal = (props: any) => {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  function closeModal() {
    return invokeModal(false);
  }
  const [allocationStartDate, setAllocationStartDate] = useState<Date | null>(null);
  const username=useSelector((state:any)=>state.User.username);
  const [allocationEndDate, setAllocationEndDate] = useState<Date | null>(null);
  const [ptoDays, setPtoDays] = useState("");
  const [holidays, setHolidays] = useState("");
  const [allocationPercentage, setAllocationPercentage] = useState("");
  const [allocationHrs, setAllocationHrs] = useState("0");
  const [resourceType1, setResourceType1] = useState("0");
  const [resourceId, setResourceId] = useState("0");
  const [projectId, setProjectId] = useState("0");
  const [allocatedPercentage, setAllocatedPercentage] = useState(0);
  const holidayDetails = useSelector((state: any) => state.Holiday.data);
  let allocationHours = 0, allocationHoursPerDay = 0;
  const calculateAllocationDays = (startDate: Date, endDate: Date) => {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    // console.log("AllocationDays Count " + count);
    return count;
  }
  let numberOfHolidays = 0;
  const calculateHolidays = (location: any, subLocation: any, startDate: Date, endDate: Date) => {
    let count = 0;
    let filteredHolidays = holidayDetails.filter((holiday: any) => holiday.locationName == location && holiday.subLocationName == subLocation && holiday.status == "Active");
    //console.log("filtered holidays ," + filteredHolidays.length)
    for (let i = 0; i < filteredHolidays.length; i++) {
      let holidayDate = new Date(filteredHolidays[i].holidayDate)
      let dayOfWeek = holidayDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && startDate <= holidayDate && endDate >= holidayDate)
        count++;
    }
    //console.log("Holiday Count " + count);
    
    //console.log("Holiday Count After " + count);
    numberOfHolidays = count;
    return count;
  }
  //allocationHours= (((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000*3600*24)-Number(ptoDays))*(8.5*Number(allocationPercentage))/100);
  const dispatch = useDispatch();
  const resourcesList = useSelector((store: any) => store.Employee.data);
  const projectsList = useSelector((store: any) => store.Project.data);
  const roles = useSelector((state: any) => state.Filters.roles);
  const getEmployeeDetails = async () => {
    const response = await fetch(`${GET_ALL_RESOURCES}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive}));
    dispatch(employeeActions.changeData(dataGet));
  };
  const getLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(filterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_SUB_LOCATIONS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive}));
    dispatch(filterActions.changeSubLocations(dataGet));
  }
  useEffect(() => {
    getEmployeeDetails();
    getLocationDetails();
    getSubLocationDetails();
  }, []);
  const getProjectDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECTS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, createdDate: row.createdDateString,updatedDate: row.updatedDateString}));
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
  }, []);
  let selectedResourceDetails = { resourceId: 0, resourceType: "", role: "", supervisor: "", location: "", resourceMarket: "", subLocation: "" };
  let selectedProjectDetails = { projectId: 0, projectMarket: "", expenseType: "", PPSID: "" }

  const setResourceDetails = (event: any) => {
    // //console.log(selectedResourceDetails, event.target.value)
    setResourceId(event.target.value);
  };
  const setProjectDetails = (event: any) => {
    setProjectId(event.target.value);
  };



  if (resourceId == "0") {
    selectedResourceDetails = { resourceId: 0, resourceType: "", role: "", supervisor: "", location: "", resourceMarket: "", subLocation: "" };
  }
  else {
    const filteredResource = resourcesList.filter((resource: any) => resource.resourceId == Number(resourceId));
    selectedResourceDetails.resourceId = filteredResource[0].resourceId
    selectedResourceDetails.resourceType = filteredResource[0].resourceType
    selectedResourceDetails.role = filteredResource[0].role
    selectedResourceDetails.supervisor = filteredResource[0].manager
    selectedResourceDetails.location = filteredResource[0].location
    selectedResourceDetails.subLocation = filteredResource[0].subLocation
    selectedResourceDetails.resourceMarket = filteredResource[0].resourceMarket
  }

  if (projectId == "0") {
    selectedProjectDetails = { projectId: 0, projectMarket: "", expenseType: "", PPSID: "" }
  }
  else {
    let filteredProject = projectsList.filter((project: any) => project.id == Number(projectId))
    selectedProjectDetails.projectId = filteredProject[0].id
    selectedProjectDetails.projectMarket = filteredProject[0].projectMarket
    selectedProjectDetails.expenseType = filteredProject[0].expenseType
    selectedProjectDetails.PPSID = filteredProject[0].projectCode
  }

  if (selectedResourceDetails.resourceType == "OGS")
    allocationHoursPerDay = 8.5;
  else if (selectedResourceDetails.resourceType == "FTE" || selectedResourceDetails.resourceType == "GTM")
    allocationHoursPerDay = 8;
  else
    allocationHoursPerDay = 0;

  let allocationP= 0;
  let allocationDays: number;

  if (resourceId != "0" && allocationEndDate != null && allocationStartDate != null) {
    allocationDays = calculateAllocationDays(allocationStartDate, allocationEndDate) - calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
    allocationHours = ((allocationDays - Number(ptoDays)) * allocationHoursPerDay * Number(allocationPercentage) / 100);
    //console.log("Allocation Hours during calculation: ", allocationHrs);
    allocationP = Math.floor(100*(Number(allocationHrs) / ((allocationDays - Number(ptoDays)) * allocationHoursPerDay)));
    //console.log("Allocation Percentage during calculation: ", allocationP);
  }

  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
    setAllocationStartDate(null);
    setAllocationEndDate(null);
    setPtoDays("");
    setAllocationPercentage("");
    setResourceType1("0");
    setResourceId("0");
    setProjectId("0");
    setHolidays("");
    setAllocationHrs("");
  }
  const allPercentToHours = (event: any) =>{
    setAllocationPercentage(event.target.value);
    allocationHours = ((allocationDays - Number(ptoDays)) * allocationHoursPerDay * Number(event.target.value) / 100);
    setAllocationHrs(allocationHours.toString());
  }
  
  //console.log("Allocation Percentage: ",allocationPercentage);
  const allHoursToPercent = (event: any) =>{
    setAllocationHrs(event.target.value);
    allocationP = Math.floor(100*(Number(event.target.value) / ((allocationDays - Number(ptoDays)) * allocationHoursPerDay)));
    setAllocationPercentage(allocationP.toString());
  }

  const getAllocationPercentage = async () => {
    if(resourceId != "0" && allocationStartDate !== null && allocationEndDate !== null){
      if(allocationEndDate >= allocationStartDate){
        try {
          let paStartDate = new Date(allocationStartDate);
              paStartDate.setDate(paStartDate.getDate() );
              let paEndDate = new Date(allocationEndDate);
              paEndDate.setDate(paEndDate.getDate());
          const response = await fetch(`${GET_TOTAL_ALLOCATED_PERCENTAGE}?resourceId=${resourceId}&startDate=${paStartDate?.toISOString().slice(0, 10)}&endDate=${paEndDate?.toISOString().slice(0, 10)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const dataResponse = await response.json();
          setAllocatedPercentage(Number(dataResponse));
        }
        catch {
          //console.log("Some Error Occured")
            ;
        }
      }
    }
  }

  useEffect(() => {
    setAllocatedPercentage(0);

    setPtoDays("");
    if (resourceId != "0" && allocationStartDate != null && allocationEndDate != null)
      {getAllocationPercentage();
      getPTODays();
      let hdays = calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
      setHolidays(hdays.toLocaleString());
    }
  }, [resourceId, allocationStartDate, allocationEndDate]);

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let paStartDate=null,paEndDate=null;
    if(allocationStartDate!=null){
      paStartDate= new Date(allocationStartDate);
      paStartDate.setDate(allocationStartDate.getDate());
    }
    if(allocationEndDate!=null){
      paEndDate= new Date(allocationEndDate);
      paEndDate.setDate(allocationEndDate.getDate());
    }
    let payload = {
      resourceId: resourceId == "0" ? 0 : Number(resourceId),
      projectId: projectId == "0" ? 0 : Number(projectId),
      resourceType1: resourceType1 == "0" ? selectedResourceDetails.role : resourceType1,
      startDate: paStartDate,
      enddDate: paEndDate,
      numberOfPTODays: ptoDays == "" ? 0 : Number(ptoDays),
      numberOfHolidays: numberOfHolidays,
      allocationHours: Number(allocationHrs),
      allocationPercentage: Number(allocationPercentage),
      createdBy: username
    };
    try {
      if(validateForm('#AllocateProjectForm')){
        const response = await fetch(`${POST_PROJECT_ALLOCATION}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const dataResponse = await response.json();
        if (dataResponse.length) {
          if (dataResponse[0].statusCode == "201") {
            //console.log(dataResponse[0].statusReason);
            //console.log(dataResponse[0].recordsCreated);
  
            dispatch(projectAllocationActions.changeToggle());
            resetFormFields();
            props.closeModal();
            toast.success("Project Allocated Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
    } catch {
      toast.error("Some Error occured.");
    }

  };
  ////console.log((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000 * 3600 * 24));

  const getPTODays = async()=>{
    //console.log("Get PTO Days called: "+ resourceId+ allocationStartDate + allocationEndDate);
    if(resourceId != "0" && allocationStartDate !== null && allocationEndDate !== null){
      if(allocationEndDate >= allocationStartDate){
        try{
          let paStartDate = new Date(allocationStartDate);
          paStartDate.setDate(paStartDate.getDate() + 1);
          let paEndDate = new Date(allocationEndDate);
          paEndDate.setDate(paEndDate.getDate()+1);
          const response = await fetch(`${GET_TOTAL_PTO_DAYS}?resourceId=${resourceId}&startDate=${paStartDate?.toISOString().slice(0, 10)}&endDate=${paEndDate?.toISOString().slice(0, 10)}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          const dataResponse = await response.json();
          // //console.log()
          setPtoDays(dataResponse);
          //console.log("Data Response: "+ dataResponse);
        }catch{
          toast.error("Some Error Occured");
        }
      }
      // else{
      //   const formGroup1 = document.getElementById('AllocationStartField');
      //   const errorContainer = formGroup1?.querySelector('.error');

      //   errorContainer.textContent = "Start Date should be smaller that the End Date";
      //   // option.errorMessage(input, label);
  
      //   const formGroup2 = document.getElementById('AllocationEndField');
        
      // }
    }
  }
  const validateResourceAndDatesforHours = ()=>{
    if(!(resourceId && allocationEndDate && allocationStartDate)){
      const errorContainer = document.getElementsByClassName('HourError');
      errorContainer[0].textContent='Resource, Allocation Start Date and Allocation End Date must be selected first';
    }else{
      const errorContainer = document.getElementsByClassName('PercentageError');
      errorContainer[0].textContent='';
    }
  }

    const validateResourceAndDatesforPercentage = ()=>{
    if(!(resourceId && allocationEndDate && allocationStartDate)){
      const errorContainer = document.getElementsByClassName('PercentageError');
      errorContainer[0].textContent='Resource, Allocation Start Date and Allocation End Date must be selected first';
    }else{
      const errorContainer = document.getElementsByClassName('PercentageError');
      errorContainer[0].textContent='';
    }
  }
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-50px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Allocate New Project
      </Button>
      <Modal show={props.showModal} id="project_allocation_modal" onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Allocate New Project</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="AllocateProjectForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="AllocateProjectResource">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select 
                    className="form-control" 
                    required
                    id="resource" 
                    value={resourceId}
                    onChange={(e: any) => {
                      setResourceDetails(e);
                      validateSingleFormGroup(document.getElementById('AllocateProjectResource'), 'select');
                      }}>
                    <option value="0">Select</option>
                    {resourcesList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceType">
                  Resource Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceType"
                  value={selectedResourceDetails.resourceType}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <input type="text" className="form-control" id="role" value={selectedResourceDetails.role} disabled />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="supervisor">
                  Supervisor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supervisor"
                  value={selectedResourceDetails.supervisor}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ocation">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={selectedResourceDetails.location}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceMarket">
                  Resource Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceMarket"
                  value={selectedResourceDetails.resourceMarket}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectField">
                <label className="form-label" htmlFor="project">
                  Project
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select 
                    className="form-control" 
                    required
                    id="project" 
                    value={projectId} 
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectField'), 'select')}
                    onChange={(e: any) => {setProjectDetails(e);
                      validateSingleFormGroup(document.getElementById('AllocateProjectField'), 'select');
                    }}>
                    <option value="0">Select</option>
                    {projectsList.filter((project: any) => project.status == "Active").map((project: any) => <option key={project.id} value={project.id.toString()}>{project.projectName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectResourceType">
                <label className="form-label" htmlFor="resourceType1">
                  Project Role
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    className="form-control "
                    required
                    // disabled
                    id="resourceType1Dropdown"
                    value={resourceType1 === "0" ? selectedResourceDetails.role : resourceType1}
                    onChange={(event) => {setResourceType1(event.target.value);
                      validateSingleFormGroup(document.getElementById('AllocateProjectResourceType'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {roles.map((role: any) => (<option key={role} value={role}> {role}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>

              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="project Market">
                  Project Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectMarket"
                  value={selectedProjectDetails.projectMarket}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ppsid">
                  PPSID
                </label>
                <input type="text" className="form-control" id="ppsid" value={selectedProjectDetails.PPSID} disabled />
              </div>

              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="capex">
                  Expense Type
                </label>
                <input type="text" className="form-control" id="capex" value={selectedProjectDetails.expenseType} disabled />
              </div>
              <div className="col-md-6 form-group" id="AllocationStartField">
                <label className="form-label" htmlFor="allocationStartDate" style={{ zIndex: "9" }}>
                  Allocation Start Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  onCalendarClose={()=>{
                    validateSingleFormGroup(document.getElementById('AllocationStartField'), 'datePicker');
                    
                  }}
                  maxDate={allocationEndDate !== null ? allocationEndDate : new Date('December 31, 2100')}
                  onChange={setAllocationStartDate}
                  value={allocationStartDate}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="AllocationEndField">
                <label className="form-label" htmlFor="allocationEndDate" style={{ zIndex: "9" }}>
                  Allocation End Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  onCalendarClose={()=>{
                    validateSingleFormGroup(document.getElementById('AllocationEndField'), 'datePicker');
                    
                  }}
                  minDate={allocationStartDate !== null ? allocationStartDate : new Date('December 31, 2000')}
                  onChange={setAllocationEndDate}
                  value={allocationEndDate}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectPTODays">
                <label className="form-label" htmlFor="ptoDays">
                  Holidays
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  type="text"
                  disabled
                  // required
                  // pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="ptoDays"
                  value={holidays}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPTODays'), 'input')}
                  // onChange={(event) => setPtoDays(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectPTODays">
                <label className="form-label" htmlFor="ptoDays">
                  PTO Days
                </label>
                {/* <span className="requiredField">*</span> */}
                <input
                  type="text"
                  disabled
                  // required
                  // pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="ptoDays"
                  value={ptoDays}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPTODays'), 'input')}
                  // onChange={(event) => setPtoDays(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>

              <div className="col-md-6 form-group" id="AllocateProjectPercentage">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Percentage)
                  {allocatedPercentage != 0 && <span style={{ color: "red" }}> Allocated : {allocatedPercentage}</span>}
                </label>
                <span className="requiredField">*</span>
                <input
                  type="text"
                  required
                  pattern={PatternsAndMessages.numberOnly.pattern}
                  className="form-control"
                  id="allocationPercentage"
                  value={allocationPercentage}
                  onFocus={validateResourceAndDatesforPercentage}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPercentage'), 'input')}
                  onChange={allPercentToHours
                  }
                />
                <div className="error PercentageError"></div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationHoursPerDay">
                  Allocation Hours Per Day
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocationHoursPerDay"
                  value={allocationHoursPerDay}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group"  id="AllocationHours">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Hours)
                </label>
                <span className="requiredField">*</span>
                <input
                  type="text"
                  className="form-control"
                  id="allocationHours"
                  required
                  value={allocationHrs}
                  // disabled
                  onFocus={validateResourceAndDatesforHours}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AllocationHours'), 'input')}
                  onChange={ allHoursToPercent
                  // (event) => setAllocationHrs(event.target.value)
                }
                />
                <div className="error HourError"></div>
              </div>
            </div>
            <div className="row" style={{marginTop:'5px'}}>
              <div className="col-md-8">
                
              </div>
              <div className="col-md-4" >
              <button type="reset" onClick={resetFormFields} className="btn btn-primary allocateResetButton" >
                  Reset
              </button>
              <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
                  Allocate
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProjectAllocation;
