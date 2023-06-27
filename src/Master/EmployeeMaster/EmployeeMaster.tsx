import SideBar from "../../SideBar/SideBar";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useSelector, useDispatch } from "react-redux";
import { employeeActions } from "../../Store/Slices/Employee";
import { read, utils, writeFile } from "xlsx";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import { filterActions } from "../../Store/Slices/Filters";
import DownloadBtn from "../../Export/DownloadBtn";
import { PatternsAndMessages } from "../../utils/ValidationPatternAndMessage";
import { validateForm, validateSingleFormGroup } from "../../utils/validations";
import { DELETE_RESOURCE, GET_ALL_LOCATIONS, GET_ALL_MARKETS, GET_ALL_RESOURCES, GET_ALL_SUB_LOCATIONS, POST_BULK_UPLOAD_EMPLOYEE, POST_RESOURCE, UPDATE_RESOURCE } from "../../constants";
import { RotatingLines } from "react-loader-spinner";
import { closeNav } from "../../SideBar/SideBarJs";


const columns = [
  {
    name: "Resource",
    selector: (row: { resourceName: any }) => row.resourceName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Role",
    selector: (row: { role: any }) => row.role == "0" ? "" : row.role,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Email Address",
    selector: (row: { emailAddress: any }) => row.emailAddress,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Manager",
    selector: (row: { manager: any }) => row.manager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Type",
    selector: (row: { resourceType: any }) => row.resourceType == "0" ? "" : row.resourceType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { resourceMarket: any }) => row.resourceMarket == "0" ? "" : row.resourceMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Location",
    selector: (row: { location: any }) => row.location == "0" ? "" : row.location,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Sub Location",
    selector: (row: { subLocation: any }) => row.subLocation == "0" ? "" : row.subLocation,
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


const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else if (selected.length == "1") return selected[0].label;
  else return selected.length + " items selected";
};

const EmployeeMaster = () => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const roles = useSelector((state: any) => state.Filters.roles);
  const resourceTypes = useSelector((state: any) => state.Filters.resourceTypes);
  const status = useSelector((state: any) => state.Filters.status);
  const toggle = useSelector((state: any) => state.Employee.toggle);
  const resources = useSelector((state: any) => state.Employee.data);
  const marketList = useSelector((state: any) => state.Market.data);
  const marketSelected = useSelector((state: any) => state.Employee.market);
  const roleSelected = useSelector((state: any) => state.Employee.role);
  const resourceTypeSelected = useSelector((state: any) => state.Employee.resourceType);
  const statusSelected = useSelector((state: any) => state.Employee.status);
  const managerSelected = useSelector((state: any) => state.Employee.manager);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [action, setAction] = useState("Add");
  const [updateResourceDetails, setUpdateResourceDetails] = useState({});
  const openModal = () => {
    setShowModal(true);
  }
  console.log("Username: ", username);
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }
  const changeMarketSelectHandler = (event: any) => {
    dispatch(employeeActions.changeMarket(event));
  };
  const changeRoleSelectHandler = (event: any) => {
    dispatch(employeeActions.changeRole(event));
  };
  const changeResourceTypeSelectHandler = (event: any) => {
    dispatch(employeeActions.changeResourceType(event));
  };

  const changeStatusSelectHandler = (event: any) => {
    dispatch(employeeActions.changeStatus(event));
  };
  const changeManagerSelectHandler = (event: any) => {
    dispatch(employeeActions.changeManager(event));
  };

  const getEmployeeDetails = async () => {
    try {
      const response = await fetch(`${GET_ALL_RESOURCES}`);
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive ,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
      dispatch(employeeActions.changeData(dataGet));
      setTimeout(()=>setIsLoading(false), 2000);
    } catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getEmployeeDetails();
  }, [toggle]);
useEffect(()=>{
  dispatch(employeeActions.changeStatus([{label:'Active', value:'Active'}]));
},[])
  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(marketActions.changeData(dataGet));
  };
  const getLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(filterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_SUB_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(filterActions.changeSubLocations(dataGet));
  }
  useEffect(() => {
    getMarketDetails();
    getLocationDetails();
    getSubLocationDetails();
  }, []);

  const resourceColumns = [
    ["ResourceName", "ResourceType", "Role", "ResourceMarket", "EmailAddress", "Location", "SubLocation", "Manager"],
  ];
  const handleDownloadTemplate = async () => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, resourceColumns);
    utils.book_append_sheet(wb, ws, "ResourceTemplate");
    writeFile(wb, "Resource.xlsx");
  };

  const [path, setPath] = useState("");
  const sendBulkResourcesData = async (payload: any) => {
    if (payload.length) {
      console.log("Payload: ",payload);
      payload = payload.map((row: any) => ({
        resourceName: row.ResourceName,
        resourceType: row.ResourceType,
        role: row.Role,
        resourceMarket: row.ResourceMarket,
        emailAddress: row.EmailAddress,
        location: row.Location,
        subLocation: row.SubLocation,
        manager: row.Manager,
      }));
      payload = payload.map((row: any) => ({ ...row, createdBy: "Admin" }));
      try {
        const response = await fetch(`${POST_BULK_UPLOAD_EMPLOYEE}`, {
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
            dispatch(employeeActions.changeToggle());
            toast.success(dataResponse[0].recordsCreated + " Resources Added Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      } catch {
        toast.error("Some Error occured.");
      }
    }
  };
  const handleUploadResourceFile = async (event: any) => {
    const files = event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          sendBulkResourcesData(rows);
          setPath("");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const filteredResources = resources.filter(
    (resource: any) => {
      
      console.log("isActive before FIlteration: ", resource.isActive);
      const marketOptions = marketSelected.map((market: any) => market.value);
      const resourceTypeOptions = resourceTypeSelected.map((resourceType: any) => resourceType.value);
      const roleOptions = roleSelected.map((role: any) => role.value);
      const statusOptions = statusSelected.map((status: any) => status.value);
      const managerOptions = managerSelected.map((manager: any) => manager.value);
      if ((!marketSelected.length) || (marketSelected.length > 0 && marketOptions.includes(resource.resourceMarket) == true)) {

        if ((!resourceTypeSelected.length) || (resourceTypeSelected.length > 0 && resourceTypeOptions.includes(resource.resourceType) == true)) {

          if ((!roleSelected.length) || (roleSelected.length > 0 && roleOptions.includes(resource.role) == true)) {

            if ((!statusSelected.length) || (statusSelected.length > 0 && statusOptions.includes(resource.isActive))) {
              if ((!managerSelected.length) || (managerSelected.length > 0 && managerOptions.includes(resource.manager)))
                return true;
            }
          }
        }
      }
      return false;
    }
  );
  const managers: any = [];
  resources.map((resource: any) => {
    if (managers.indexOf(resource.manager) === -1) {
      managers.push(resource.manager);
    }
  })
  const handleRowDoubleClicked = (row: any) => {
    setShowModal(true);
    setAction("Update");
    let data = { ...row, isActive: row.isActive  }
    setUpdateResourceDetails(data);
  };

  //start constants for export
  const columnsAndSelectors=[
    {'name': 'Resource' , 'selector': 'resourceName','default':'true'},
    {'name': 'Role' , 'selector': 'role','default':'true'},
    {'name': 'Email Address', 'selector': 'emailAddress','default':'true' },
    {'name': 'Manager', 'selector': 'manager','default':'true'},
    {'name': 'Resource Type', 'selector': 'resourceType','default':'true'},
    {'name': 'Market', 'selector': 'resourceMarket','default':'true'},
    {'name': 'Location', 'selector': 'location','default':'true'},
    {'name': 'Sub Location', 'selector':'subLocation','default':'true' },
    {'name': 'Status', 'selector' : 'isActive','default':'true'},
    {'name': 'Created Date', 'selector' : 'createdDate','default':'true'},
    {'name': 'Created By', 'selector' : 'createdBy','default':'true'},
    {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
    {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},
  ]
  const title = "Resource Details";
  //end constants for export

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
            <h1 className="Heading-Cls">Resource Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Resource Details</span>
            </p>
            <div className="btns employee">
              <div style={{display:'flex', width:'25%',float:'right', justifyContent:'space-between', position:'relative'}}>
              <div className="DownloadEmployeeTemplate" style={{width:'15%',marginRight:'-205px', marginLeft:'80%'}}>
                <button  type="button" className="btn btn-primary download-button-btn" onClick={handleDownloadTemplate}>
                  <i className="las la-file-download"></i>
                </button>
                <div className="DownloadEmployeeTemplateTooltip">
                  <p>
                    Download Template
                  </p>
                </div>
              </div>
              <div className="UploadBulkEmployeeDetails" style={{width:'15%',marginLeft:'7%'}}>
                <button  type="button" className="btn btn-primary upload-button-btn">
                  <i className="las la-file-upload"></i>
                </button>
                <input
                  type="file"
                  value=""
                  id="input-resources-file"
                  className="btn btn-primary custom-file-input upload-input-btn"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={handleUploadResourceFile}
                />
                <div className="BulkUploadEmployeeTooltip">
                  <p>
                    Add Bulk Resources
                  </p>
                </div>
              </div>
              <div className="AddEmployeeButton" style={{float:'right', width:'45%'}}>
                {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
                {action == "Update" && <UpdateModal initialValues={updateResourceDetails} onSave={onSave} showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              </div>
              </div>
            </div>
          </div>
          <div className="row filter-row">

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
                Manager
              </label>
              <MultiSelect
                options={managers.map((manager: any) => ({ label: manager, value: manager }))}
                value={managerSelected}
                onChange={changeManagerSelectHandler}
                labelledBy="Select Manager"
                valueRenderer={customValueRenderer}
              />
            </div>
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
                Market
              </label>
              <MultiSelect
                options={(marketList.map((market: any) => ({ label: market.marketName, value: market.marketName })))}
                value={marketSelected}
                onChange={changeMarketSelectHandler}
                labelledBy="Select Market"
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
                onChange={changeStatusSelectHandler}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button"  className="btn btn-primary" onClick={() => dispatch(employeeActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
        <div className="TableContentBorder" >
        <Table columnsAndSelectors={columnsAndSelectors}columns={columns} isLoading={isLoading} data={filteredResources} onRowDoubleClicked={handleRowDoubleClicked} title={title}/>
        </div>
        </div>
      </div>}
    </div>
  );
};

const AddModal = (props: any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const roles = useSelector((state: any) => state.Filters.roles);
  const resourceTypes = useSelector((state: any) => state.Filters.resourceTypes);
  const marketList = useSelector((state: any) => state.Market.data);
  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);
  const resourceList = useSelector((state: any) => state.Employee.data);
  console.log("Resource List: ", resourceList);
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("0");
  const [manager, setManager] = useState("");
  const [resourceType, setResourceType] = useState("0");
  const [location, setLocation] = useState("0");
  const [subLocation, setSubLocation] = useState("0");
  const [market, setMarket] = useState("0");
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
  
  let resourceManagers = resourceList.filter((resource: any)=> resource.role.search(/Manager/i) != -1 );

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      resourceName: employeeName,
      role: role,
      manager: manager,
      resourceType: resourceType,
      location: location,
      subLocation: subLocation,
      resourceMarket: market,
      emailAddress: employeeEmailAddress,
      createdBy: username,
    };
    try {
      if(validateForm('#AddEmployeeForm')){
        const response = await fetch(`${POST_RESOURCE}`, {
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
  
            dispatch(employeeActions.changeToggle());
            resetFormFields();
            props.closeModal();
            toast.success("Resource Added Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
    } catch {
      toast.error("Some Error occured.");
    }
  };

  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
    setEmployeeName("");
    setRole("0");
    setManager("");
    setResourceType("0");
    setLocation("0");
    setSubLocation("0");
    setMarket("0");
    setEmployeeEmailAddress("");
  };

  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px"}}
        
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Add Resource
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New Resource</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="AddEmployeeForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="AddResourceField">
                <label className="form-label">Resource</label>
                <span className="requiredField">*</span>
                <input
                  required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  type="text"
                  className="form-control"
                  id="resource"
                  value={employeeName}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceField'), 'input')}
                  onChange={(event) => setEmployeeName(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group " id="AddRoleField">
                <label className="form-label">Role</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    id="employeeRole"
                    className="form-control"
                    value={role}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AddRoleField'), 'select')}
                    onChange={(event) => {setRole(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddRoleField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {roles.map((role: any) => (<option key={role} value={role}>{role}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AddResourceEmailField">
                <label className="form-label">Email Address</label>
                {/* <span className="requiredField">*</span> */}
                <input
                  // required
                  pattern={PatternsAndMessages.email.pattern}
                  type="text"
                  className="form-control"
                  id="employeeEmailAddress"
                  value={employeeEmailAddress}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceEmailField'),'input')}
                  onChange={(event) => setEmployeeEmailAddress(event.target.value)}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group" id="AddResourceManagerField">
                <label className="form-label">Manager</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="manager"
                    value={manager}
                    onChange={(event) => {
                      setManager(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddResourceManagerField'), 'select');
                    }}>                  
                    <option value="0">Select</option>
                    {resourceManagers.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AddResourceResourceTypeField">
                <label className="form-label">Resource Type</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    id="resourceType"
                    className="form-control"
                    value={resourceType}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceResourceTypeField'),'select')}
                    onChange={(event) => {setResourceType(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddResourceResourceTypeField'),'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {resourceTypes.map((resourceType: any) => (<option key={resourceType} value={resourceType}>{resourceType}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AddResourceMarketField">
                <label className="form-label">Market</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="market"
                    required
                    className="form-control"
                    value={market}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceMarketField'), 'select')}
                    onChange={(event) => {setMarket(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddResourceMarketField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.marketName}>{market.marketName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="AddResourceLocationField">
                <label className="form-label">Location</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="location"
                    required
                    className="form-control"
                    value={location}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceLocationField'), 'select')}
                    onChange={(event) => {setLocation(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddResourceLocationField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {locations.map((location: any) => (<option key={location.locationId} value={location.locationName}> {location.locationName}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>

              <div className="col-md-6 form-group " id="AddResourceSubLocationField">
                <label className="form-label">Sub Location</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    className="form-control"
                    required
                    id="holidaySubLocation"
                    value={subLocation}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('AddResourceSubLocationField'), 'select')}
                    onChange={(event: any) => {setSubLocation(event.target.value);
                      validateSingleFormGroup(document.getElementById('AddResourceSubLocationField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {location == "0" ? [] : (subLocations.filter((subLocation: any) => location == subLocation.locationName).map((subLocation: any) => (<option key={subLocation.subLocationId} value={subLocation.subLocationName}>{subLocation.subLocationName}</option>)))}
                  </select>
                <div className="error"></div>
                </div>
              </div>

            </div>
            <div className="row">
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
};

const onSave = (props: any) => {
  console.log(props);
}

const UpdateModal = (props: any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);
  const roles = useSelector((state: any) => state.Filters.roles);
  const resourceTypes = useSelector((state: any) => state.Filters.resourceTypes);
  const marketList = useSelector((state: any) => state.Market.data);
  const [formValues, setFormValues] = useState(props.initialValues || { location: "0" });
  let location = formValues.location;
  const resourceList = useSelector((state: any) => state.Employee.data);
  let resourceManagers = resourceList.filter((resource: any)=> resource.role.search(/Manager/i) != -1 );


  const handleSave = async (event: any) => {
    event.preventDefault();
    let payload = {
      resourceId: formValues.resourceId,
      resourceName: formValues.resourceName,
      role: formValues.role,
      manager: formValues.manager,
      resourceType: formValues.resourceType,
      location: formValues.location,
      subLocation: formValues.subLocation,
      resourceMarket: formValues.resourceMarket,
      emailAddress: formValues.emailAddress,
      isActive: formValues.isActive,
      updatedBy: username,
    };
    try {
      if(validateForm('#UpdateResourceForm')){
        const response = await fetch(`${UPDATE_RESOURCE}`, {
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
            dispatch(employeeActions.changeToggle());
            props.closeModal();
            toast.success("Resource Updated Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
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
  
  const getEmployeeDetails = async () => {
    try {
      const response = await fetch(`${GET_ALL_RESOURCES}`);
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive ,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
      dispatch(employeeActions.changeData(dataGet));
      } catch {
      console.log("Error occured");
    }
  };

  
  function deleteConfirmation() {
    var txt;
    if (window.confirm(`Deleting current record`)) {
      txt = "You pressed OK!";
      handleDelete();
    } else {
      txt = "You pressed Cancel!";
    }
  }
  const handleDelete = async()=>{
    // id: formValues.id,
    const response = await fetch(`${DELETE_RESOURCE}/${formValues.resourceId}`);
    getEmployeeDetails();
    props.closeModal();
  }
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px", padding:"3px 6px 4px 6px", borderRadius:"4px" }}
        
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Add Employee
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Resource</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSave} id="UpdateResourceForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="UpdateResourceResourceField">
                <label className="form-label">Resource</label>
                <span className="requiredField">*</span>
                <input
                  type="text"
                  required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  name="resourceName"
                  className="form-control"
                  id="resource"
                  value={formValues.resourceName}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceResourceField'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group " id="UpdateResourceRoleField">
                <label className="form-label">Role</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="employeeRole"
                    required
                    name="role"
                    className="form-control"
                    value={formValues.role}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceRoleField'), 'select')}
                    onChange={(e: any) => {handleChange(e);
                      validateSingleFormGroup(document.getElementById('UpdateResourceRoleField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {roles.map((role: any) => (<option key={role} value={role}>{role}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="UpdateResourceEmailField">
                <label className="form-label">Email Address</label>
                {/* <span className="requiredField">*</span> */}
                <input
                  type="text"
                  // required
                  pattern={PatternsAndMessages.email.pattern}
                  name="emailAddress"
                  className="form-control"
                  id="employeeEmailAddress"
                  value={formValues.emailAddress}
                  // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceEmailField'), 'input')}
                  onChange={handleChange}
                />
                {/* <div className="error"></div> */}
              </div>
              <div className="col-md-6 form-group" id="UpdateResourceManagerField">
                <label className="form-label">Manager</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                <select
                    required
                    className="form-control"
                    id="manager"
                    name="manager"
                    value={formValues.manager}
                    onChange={(event) => {
                      // setManager(event.target.value);
                      handleChange(event);
                      validateSingleFormGroup(document.getElementById('UpdateResourceManagerField'), 'select');
                    }}>                  
                    <option value="0">Select</option>
                    {/* <option value={formValues.manager}>{formValues.manager}</option> */}
                    {resourceManagers.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceName.toString()}>{resource.resourceName}</option>)}
                  
                  </select>
                <div className="error"></div>
              </div>
              </div>
              <div className="col-md-6 form-group" id="UpdateResourceResourceTypeField">
                <label className="form-label">Resource Type</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="resourceType"
                    required
                    name="resourceType"
                    className="form-control"
                    value={formValues.resourceType}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceResourceTypeField'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('UpdateResourceResourceTypeField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {resourceTypes.map((resourceType: any) => (<option key={resourceType} value={resourceType}>{resourceType}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="UpdateResourceMarketField">
                <label className="form-label">Market</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="market"
                    required
                    name="resourceMarket"
                    className="form-control"
                    value={formValues.resourceMarket}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceMarketField'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('UpdateResourceMarketField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.marketName}>{market.marketName}</option>)}
                  </select>
                <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="UpdateResourceLocationField">
                <label className="form-label">Location</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    id="location"
                    required
                    name="location"
                    className="form-control"
                    value={formValues.location}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceLocationField'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('UpdateResourceLocationField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {locations.map((location: any) => (<option key={location.locationId} value={location.locationName}> {location.locationName}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div>

              <div className="col-md-6 form-group " id="UpdateResourceSubLocationField">
                <label className="form-label">Sub Location</label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    name="subLocation"
                    required
                    className="form-control"
                    id="holidaySubLocation"
                    value={formValues.subLocation}
                    // onBlur={()=>validateSingleFormGroup(document.getElementById('UpdateResourceSubLocationField'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('UpdateResourceSubLocationField'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {location == "0" ? [] : (subLocations.filter((subLocation: any) => location == subLocation.locationName).map((subLocation: any) => (<option key={subLocation.subLocationId} value={subLocation.subLocationName}>{subLocation.subLocationName}</option>)))}
                  </select>
                <div className="error"></div>
                </div>
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
}

export default EmployeeMaster;
