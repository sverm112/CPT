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
import { GET_ALL_HOLIDAYS, GET_ALL_LOCATIONS, GET_ALL_MARKETS, GET_ALL_PROJECTS, GET_ALL_PROJECT_ALLOCATIONS, GET_ALL_RESOURCES, GET_ALL_SUB_LOCATIONS, GET_TOTAL_ALLOCATED_PERCENTAGE, GET_TOTAL_PTO_DAYS, POST_PROJECT_ALLOCATION } from "../constants";

const columns = [
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
    selector: (row: { manager: any }) => row.manager,
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

  {
    name: "Project",
    selector: (row: { projectName: any }) => row.projectName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Type1",
    selector: (row: { resourceType1: any }) => row.resourceType1 == "0" ? "" : row.resourceType1,
    sortable: true,
    reorder: true,
    filterable: true,
  },

  {
    name: "Project Market",
    selector: (row: { projectMarket: any }) => row.projectMarket,
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
    name: "Expense Type",
    selector: (row: { expenseType: any }) => row.expenseType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Start Date",
    selector: (row: { startDate: any }) => row.startDate.slice(0, 10),
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "End Date",
    selector: (row: { enddDate: any }) => row.enddDate.slice(0, 10),
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "PTO Days",
    selector: (row: { pTODays: any }) => row.pTODays,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Allocation(Hours)",
    selector: (row: { allocationHours: any }) => row.allocationHours,
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
  {'name':'Resource','selector':'resourceName','default':'true'},
  {'name':'Resource Type','selector':'resourceType','default':'true'},
  {'name':'Role','selector':'role','default':'false'},
  {'name':'Supervisor','selector':'manager','default':'false'},
  {'name':'Location','selector':'location','default':'true'},
  {'name':'Resource Market','selector':'resourceMarket','default':'false'},
  {'name':'Project','selector':'projectName','default':'true'},
  {'name':'Resource Type1','selector':'resourceType1','default':'false'},
  {'name':'Project Market','selector':'projectMarket','default':'true'},
  {'name':'Project Code','selector':'projectCode','default':'false'},
  {'name':'Expense Type','selector':'expenseType','default':'false'},
  {'name':'Start Date','selector':'startDate','default':'true'},
  {'name':'End Date','selector':'enddDate','default':'true'},
  {'name':'PTO Days','selector':'pTODays','default':'true'},
  {'name':'Allocation(Hours)','selector':'allocationHours','default':'true'},
  {'name':'Status','selector':'isActive','default':'false'},
  {'name':'Created Date','selector':'createdDate','default':'false'},
  {'name':'Created By','selector':'createdBy','default':'false'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},

  

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
  const expenseTypeSelected = useSelector((store: any) => store.ProjectAllocation.expenseType)
  const locationSelected = useSelector((store: any) => store.ProjectAllocation.location)
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

  const getProjectAllocationDetails = async () => {
    const response = await fetch(`${GET_ALL_PROJECT_ALLOCATIONS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, projectMarket: row.marketName,createddate:row.createdDate.slice(0, 10),updatedDate:row.updatedDate.slice(0,10), isActive: row.isActive == "1" ? "Active" : "Inactive" }));

    dispatch(projectAllocationActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectAllocationDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  const getHolidayDetails = async () => {
    const response = await fetch(`${GET_ALL_HOLIDAYS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
    dispatch(holidayActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
    getHolidayDetails();
  }, []);


  const filteredProjectAllocations = projectAllocations.filter((projectAllocation: any) => {
    const resourceMarketOptions = resourceMarketSelected.map((resourceMarket: any) => resourceMarket.value);
    const resourceTypeOptions = resourceTypeSelected.map((resourceType: any) => resourceType.value);
    const roleOptions = roleSelected.map((role: any) => role.value);
    const expenseTypeOptions = expenseTypeSelected.map((expenseType: any) => expenseType.value);
    const projectMarketOptions = projectMarketSelected.map((projectMarket: any) => projectMarket.value);
    if ((!resourceMarketSelected.length) || (resourceMarketSelected.length > 0 && resourceMarketOptions.includes(projectAllocation.resourceMarket) == true)) {
      if ((!resourceTypeSelected.length) || (resourceTypeSelected.length > 0 && resourceTypeOptions.includes(projectAllocation.resourceType) == true)) {
        if ((!roleSelected.length) || (roleSelected.length > 0 && roleOptions.includes(projectAllocation.role) == true)) {
          if ((!expenseTypeSelected.length) || (expenseTypeSelected.length > 0 && expenseTypeOptions.includes(projectAllocation.expenseType) == true)) {
            if ((!projectMarketSelected.length) || (projectMarketSelected.length > 0 && projectMarketOptions.includes(projectAllocation.projectMarket) == true)) {
              if (locationSelected == "0" || locationSelected == projectAllocation.location)
                return true;
            }
          }
        }
      }
    }
    return false;
  });

  //start constants for export
  const title = "Project Allocation Details";
  const headers = [['Resource', 'Resource Type', 'Location',
    'Project', 'Project Market', 'Start Date', 'End Date', 'PTO Days', 'Allocation(Hours)']];
  const selectors = ['resourceName', 'resourceType',
    'location', 'projectName', 'projectMarket',
    'startDate', 'enddDate', 'pTODays', 'allocationHours']
  //end constants for export

  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
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
              <ModalDialog />
            </div>
          </div>
        </div>
        <div className="row filter-row">

          <div className="col-md-2 form-group">
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
          <div className="col-md-2 form-group">
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
          <div className="col-md-2" style={{ marginTop: "24px" }}>
            <button type="button" className="btn btn-primary" onClick={() => dispatch(projectAllocationActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
          </div>
        </div>
        {/* <DownloadBtn 
            columns={columns}
            filteredRecords={filteredProjectAllocations}
            selectors={selectors}
            title={title}>
          </DownloadBtn> */}
          <div className="TableContentBorder">
            <Table columnsAndSelectors={columnsAndSelectors} columns={columns} data={filteredProjectAllocations} title={title}/>
          </div>
      </div>
    </div>
  );
};

const ModalDialog = () => {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  function closeModal() {
    return invokeModal(false);
  }
  const [allocationStartDate, setAllocationStartDate] = useState<Date | null>(null);
  const [allocationEndDate, setAllocationEndDate] = useState<Date | null>(null);
  const [ptoDays, setPTODays] = useState("");
  const [allocationPercentage, setAllocationPercentage] = useState("");
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
    console.log("AllocationDays Count " + count);
    return count;
  }
  const calculateHolidays = (location: any, subLocation: any, startDate: Date, endDate: Date) => {
    let count = 0;
    let filteredHolidays = holidayDetails.filter((holiday: any) => holiday.locationName == location && holiday.subLocationName == subLocation && holiday.isActive == "Active");
    console.log("filtered holidays ," + filteredHolidays.length)
    for (let i = 0; i < filteredHolidays.length; i++) {
      let holidayDate = new Date(filteredHolidays[i].holidayDate)
      let dayOfWeek = holidayDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && startDate <= holidayDate && endDate >= holidayDate)
        count++;
    }
    console.log("Holiday Count " + count);
    return count;
  }
  //allocationHours= Math.ceil(Math.ceil((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000*3600*24)-Number(ptoDays))*(8.5*Number(allocationPercentage))/100);
  const dispatch = useDispatch();
  const resourcesList = useSelector((store: any) => store.Employee.data);
  const projectsList = useSelector((store: any) => store.Project.data);
  const roles = useSelector((state: any) => state.Filters.roles);
  const getEmployeeDetails = async () => {
    const response = await fetch(`${GET_ALL_RESOURCES}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
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
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
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
    dataGet = dataGet.map((row: any) => ({ ...row, projectMarket: row.marketName, projectId: row.pkProjectID, isActive: row.isActive == 1 ? "Active" : "InActive" }));
    dispatch(projectActions.changeData(dataGet));
  };
  useEffect(() => {
    getProjectDetails();
  }, []);
  let selectedResourceDetails = { resourceId: 0, resourceType: "", role: "", supervisor: "", location: "", resourceMarket: "", subLocation: "" };
  let selectedProjectDetails = { projectId: 0, projectMarket: "", expenseType: "", PPSID: "" }

  const setResourceDetails = (event: any) => {
    console.log(selectedResourceDetails, event.target.value)
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
    let filteredProject = projectsList.filter((project: any) => project.pkProjectID == Number(projectId))
    selectedProjectDetails.projectId = filteredProject[0].pkProjectID
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

  if (resourceId != "0" && allocationEndDate != null && allocationStartDate != null) {
    let allocationDays = calculateAllocationDays(allocationStartDate, allocationEndDate) - calculateHolidays(selectedResourceDetails.location, selectedResourceDetails.subLocation, allocationStartDate, allocationEndDate);
    allocationHours = Math.ceil((allocationDays - Number(ptoDays)) * allocationHoursPerDay * Number(allocationPercentage) / 100);
  }

  const resetFormFields = () => {
    setAllocationStartDate(null);
    setAllocationEndDate(null);
    setPTODays("");
    setAllocationPercentage("");
    setResourceType1("0");
    setResourceId("0");
    setProjectId("0");
  }
  const getAllocationPercentage = async () => {
    let payload = {
      fkResourceID: Number(resourceId),
      startDate: allocationStartDate,
      endDate: allocationEndDate
    };
    try {
      const response = await fetch(`${GET_TOTAL_ALLOCATED_PERCENTAGE}?fkResourceID=${resourceId}&startDate=${allocationStartDate?.toISOString().slice(0, 10)}&endDate=${allocationEndDate?.toISOString().slice(0, 10)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataResponse = await response.json();
      setAllocatedPercentage(Number(dataResponse));
    }
    catch {
      console.log("Some Error Occured")
        ;
    }
  }
  useEffect(() => {
    setAllocatedPercentage(0);
    setPTODays("");
    if (resourceId != "0" && allocationStartDate != null && allocationEndDate != null)
      {getAllocationPercentage();
      getPTODays();
    }
  }, [resourceId, allocationStartDate, allocationEndDate]);

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      fkResourceID: resourceId == "0" ? 0 : Number(resourceId),
      fkProjectID: projectId == "0" ? 0 : Number(projectId),
      resourceType1: resourceType1,
      startDate: allocationStartDate,
      enddDate: allocationEndDate,
      pTODays: ptoDays == "" ? 0 : Number(ptoDays),
      allocationHours: allocationHours,
      allocationPercentage: Number(allocationPercentage),
      isActive: 1,
      createdBy: "Admin"
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
            console.log(dataResponse[0].statusReason);
            console.log(dataResponse[0].recordsCreated);
  
            dispatch(projectAllocationActions.changeToggle());
            resetFormFields();
            closeModal();
            toast.success("Project Allocated Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
    } catch {
      toast.error("Some Error occured.");
    }

  };
  //console.log((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000 * 3600 * 24));

  const getPTODays = async()=>{
    console.log("Get PTO Days called: "+ resourceId+ allocationStartDate + allocationEndDate);
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
          // console.log()
          setPTODays(dataResponse);
          console.log("Data Response: "+ dataResponse);
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
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-50px" }}
        variant="primary"
        onClick={initModal}
      >
        <i className="las la-plus"></i> Allocate New Project
      </Button>
      <Modal show={isShow} id="project_allocation_modal" onHide={closeModal}>
        <Modal.Header closeButton onClick={closeModal}>
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
                    // onBlur={()=>{
                    //   validateSingleFormGroup(document.getElementById('AllocateProjectResource'), 'select');
                      
                    // }} 
                    onChange={(e: any) => {setResourceDetails(e);
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
                    {projectsList.filter((project: any) => project.isActive == "Active").map((project: any) => <option key={project.pkProjectID} value={project.pkProjectID.toString()}>{project.projectName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AllocateProjectResourceType">
                <label className="form-label" htmlFor="resourceType1">
                  Resource Type 1
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    className="form-control "
                    required
                    id="resourceType1Dropdown"
                    value={resourceType1}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectResourceType'), 'select')}
                    onChange={(event) => {setResourceType1(event.target.value);
                      validateSingleFormGroup(document.getElementById('AllocateProjectResourceType'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {roles.map((role: any) => (<option key={role} value={role}>{role}</option>))}
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
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
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
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
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
                  // onChange={(event) => setPTODays(event.target.value)}
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
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AllocateProjectPercentage'), 'input')}
                  onChange={(event) => setAllocationPercentage(event.target.value)}
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
                  value={allocationHoursPerDay}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Hours)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocationHours"
                  value={allocationHours}
                  disabled
                // onChange={(event) => setAllocationHours(event.target.value)}
                />
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
};
export default ProjectAllocation;
