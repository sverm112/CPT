import SideBar from "../../SideBar/SideBar";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useSelector, useDispatch } from "react-redux";
import { employeeActions } from "../../Store/Slices/Employee";
import { read, utils, writeFile } from "xlsx";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import { filterActions } from "../../Store/Slices/Filters";

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
    selector: (row: { role: any }) => row.role =="0" ? "" : row.role,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Email Address",
    selector: (row: { emailAddress: any }) => row.emailAddress ,
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
    selector: (row: { resourceType: any }) => row.resourceType =="0" ? "" : row.resourceType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { resourceMarket: any }) => row.resourceMarket =="0" ? "" : row.resourceMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Location",
    selector: (row: { location: any }) => row.location =="0" ? "" : row.location,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Sub Location",
    selector: (row: { subLocation: any }) => row.subLocation =="0" ? "" : row.subLocation,
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
  else if (selected.length == "1") return selected[0].label;
  else return selected.length + " items selected";
};

const EmployeeMaster = () => {
  const dispatch = useDispatch();
  const roles=useSelector((state: any) => state.Filters.roles);
  const resourceTypes=useSelector((state: any) => state.Filters.resourceTypes);
  const status=useSelector((state: any) => state.Filters.status);
  const toggle = useSelector((state: any) => state.Employee.toggle);
  const resources = useSelector((state: any) => state.Employee.data);
  const marketList=useSelector((state: any) => state.Market.data);
  const marketSelected = useSelector((state: any) => state.Employee.market);
  const roleSelected = useSelector((state: any) => state.Employee.role);
  const resourceTypeSelected = useSelector((state: any) => state.Employee.resourceType);
  const statusSelected = useSelector((state: any) => state.Employee.status);
  const [showModal,setShowModal]=useState(false);
  const [action,setAction]=useState("Add");
  const [updateResourceDetails,setUpdateResourceDetails]=useState({});
  const openModal=()=>{
    setShowModal(true);
  }
  const closeModal=()=>{
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

  const getEmployeeDetails = async () => {
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/Resources/GetAllResources");
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive : row.isActive==1 ? "Active" : "InActive" }));
      dispatch(employeeActions.changeData(dataGet));
    } catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getEmployeeDetails();
  }, [toggle]);

  const getMarketDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets");
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive : row.isActive==1 ? "Active" : "InActive" }));
    dispatch(marketActions.changeData(dataGet));
  };
  const getLocationDetails= async () =>{
    const response = await fetch("http://10.147.172.18:9190/api/v1/Location/GetAllLocations");
    const dataGet = await response.json();
    dispatch(filterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails= async () =>{
    const response = await fetch("http://10.147.172.18:9190/api/v1/SubLocation/GetAllSubLocations");
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
        const response = await fetch("http://10.147.172.18:9190/api/v1/Resources/BulkUploadResources", {
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
            toast.success(dataResponse[0].recordsCreated+" Resources Added Successfully")
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


  const filteredResources=resources.filter(
    (resource : any)=>{

      const marketOptions=marketSelected.map((market: any)=>market.value);
      const resourceTypeOptions=resourceTypeSelected.map((resourceType: any)=>resourceType.value);
      const roleOptions=roleSelected.map((role: any)=>role.value);
      const statusOptions=statusSelected.map((status: any)=>status.value);
      if((!marketSelected.length) ||(marketSelected.length>0 && marketOptions.includes(resource.resourceMarket)==true))
      {
        
        if(  (!resourceTypeSelected.length) || (resourceTypeSelected.length>0 && resourceTypeOptions.includes(resource.resourceType)==true))
        {
          
          if( (!roleSelected.length) || (roleSelected.length>0 && roleOptions.includes(resource.role)==true))
          {
            
            if((!statusSelected.length)|| (statusSelected.length>0 && statusOptions.includes(resource.isActive) ))
            return true;
          }
        } 
      }
      return false;
    }
  );
 const handleRowDoubleClicked=(row: any)=>{
  console.log(row);
  setShowModal(true);
  setAction("Update");
  let data={...row,isActive:row.isActive=="Active" ? "1" : "2"}
  console.log(data);
  setUpdateResourceDetails(data);
 }
 
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Employee Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Employee Details</span>
            </p>
            <div className="btns employee">
              <button title="Download Template" type="button" className="btn btn-primary download-button-btn" onClick={handleDownloadTemplate}>
                <i className="las la-file-download"></i>
              </button>
              <button title="Upload File" type="button" className="btn btn-primary upload-button-btn">
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

              {action=="Add" &&<ModalDialog  showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action=="Update" &&<UpdateModal initialValues={updateResourceDetails} onSave={onSave} showModal={showModal} openModal={openModal} closeModal={closeModal} />}
            </div>
          </div>
          <div className="row filter-row">
            
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Role
              </label>
              <MultiSelect
                options={roles.map((role:any)=>({label:role,value:role}))}
                value={roleSelected}
                onChange={changeRoleSelectHandler}
                labelledBy="Select Role"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Resource Type
              </label>
              <MultiSelect
                options={resourceTypes.map((resourceType:any)=>({label : resourceType,value:resourceType}))}
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
                options={(marketList.map((market:any)=>({label : market.marketName, value : market.marketName})))}
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
                options={status.map((status:any)=>({label:status,value:status}))}
                value={statusSelected}
                onChange={changeStatusSelectHandler}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2" style={{marginTop:"24px"}}>
              <button type="button" className="btn btn-primary" onClick={()=>dispatch(employeeActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>

          <Table columns={columns} data={filteredResources} onRowDoubleClicked={handleRowDoubleClicked}/>
        </div>
      </div>
    </div>
  );
};



const ModalDialog = (props : any) => {
  const dispatch = useDispatch();
  const roles=useSelector((state: any) => state.Filters.roles);
  const resourceTypes=useSelector((state: any) => state.Filters.resourceTypes);
  const marketList=useSelector((state: any) => state.Market.data);
  const locations=useSelector((state: any) => state.Filters.locations);
  const subLocations=useSelector((state: any) => state.Filters.subLocations);
 
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("0");
  const [manager, setManager] = useState("");
  const [resourceType, setResourceType] = useState("0");
  const [location, setLocation] = useState("0");
  const [subLocation, setSubLocation] = useState("0");
  const [market, setMarket] = useState("0");
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
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
      createdBy: "Admin",
    };
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/Resources/PostResources", {
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
    } catch {
      toast.error("Some Error occured.");
    }
  };

  

  const resetFormFields = () => {
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
        style={{ float: "right", marginTop: "-68px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Add Employee
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New Employee</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label">Resource</label>
                <input
                  type="text"
                  className="form-control"
                  id="resource"
                  value={employeeName}
                  onChange={(event) => setEmployeeName(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group ">
                <label className="form-label">Role</label>
                <div className="dropdown">
                  <select
                    id="employeeRole"
                    className="form-control"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {roles.map((role:any)=>(<option key={role} value={role}>{role}</option>))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeEmailAddress"
                  value={employeeEmailAddress}
                  onChange={(event) => setEmployeeEmailAddress(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Manager</label>
                <input
                  type="text"
                  className="form-control"
                  id="manager"
                  value={manager}
                  onChange={(event) => setManager(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Resource Type</label>
                <div className="dropdown">
                  <select
                    id="resourceType"
                    className="form-control"
                    value={resourceType}
                    onChange={(event) => setResourceType(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {resourceTypes.map((resourceType:any)=>(<option key={resourceType} value={resourceType}>{resourceType}</option>))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Market</label>
                <div className="dropdown">
                  <select
                    id="market"
                    className="form-control"
                    value={market}
                    onChange={(event) => setMarket(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market:any)=>market.isActive=="Active").map((market:any)=><option key={market.pkMarketID} value={market.marketName}>{market.marketName}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Location</label>
                <div className="dropdown">
                  <select
                    id="location"
                    className="form-control"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {locations.map((location:any)=>(<option key={location.locationId} value={location.locationName}> {location.locationName}</option>))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 form-group ">
                <label className="form-label">Sub Location</label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="holidaySubLocation"
                    value={subLocation}
                    onChange={(event: any) => setSubLocation(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {location=="0" ? []: (subLocations.filter((subLocation:any)=>location==subLocation.locationName).map((subLocation:any)=>(<option key={subLocation.subLocationId} value={subLocation.subLocationName}>{subLocation.subLocationName}</option>)))}
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
};

const onSave=(props: any)=>{
  console.log(props);
}

const UpdateModal=(props:any) =>{
  const dispatch = useDispatch();
  const locations=useSelector((state: any) => state.Filters.locations);
  const subLocations=useSelector((state: any) => state.Filters.subLocations);
  const roles=useSelector((state: any) => state.Filters.roles);
  const resourceTypes=useSelector((state: any) => state.Filters.resourceTypes);
  const marketList=useSelector((state: any) => state.Market.data);
  const [formValues, setFormValues] = useState(props.initialValues || {location : "0"});
  let location=formValues.location;
  

  const handleSave = async (event : any) => {
    event.preventDefault();
    let payload = {
      resourceId : formValues.resourceId,
      resourceName: formValues.resourceName,
      role: formValues.role,
      manager: formValues.manager,
      resourceType: formValues.resourceType,
      location: formValues.location,
      subLocation: formValues.subLocation,
      resourceMarket: formValues.resourceMarket,
      emailAddress: formValues.emailAddress,
      isActive : formValues.isActive=="2" ? "0" : "1",
      updatedBy: "Admin",
    };
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/Resources/UpdateResources", {
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
    } catch {
      toast.error("Some Error occured.");
    }
  };
    

  const handleChange = (e :any) => {
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
        <i className="las la-plus"></i> Add Employee
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Employee</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label">Resource</label>
                <input
                  type="text"
                  name="resourceName"
                  className="form-control"
                  id="resource"
                  value={formValues.resourceName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 form-group ">
                <label className="form-label">Role</label>
                <div className="dropdown">
                  <select
                    id="employeeRole"
                    name="role"
                    className="form-control"
                    value={formValues.role}
                  onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {roles.map((role:any)=>(<option key={role} value={role}>{role}</option>))}
                     </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  name="emailAddress"
                  className="form-control"
                  id="employeeEmailAddress"
                  value={formValues.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Manager</label>
                <input
                  type="text"
                  name="manager"
                  className="form-control"
                  id="manager"
                  value={formValues.manager}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Resource Type</label>
                <div className="dropdown">
                  <select
                    id="resourceType"
                    name="resourceType"
                    className="form-control"
                    value={formValues.resourceType}
                  onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {resourceTypes.map((resourceType:any)=>(<option key={resourceType} value={resourceType}>{resourceType}</option>))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Market</label>
                <div className="dropdown">
                  <select
                    id="market"
                    name="resourceMarket"
                    className="form-control"
                    value={formValues.resourceMarket}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market:any)=>market.isActive=="Active").map((market:any)=><option key={market.pkMarketID} value={market.marketName}>{market.marketName}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Location</label>
                <div className="dropdown">
                  <select
                    id="location"
                    name="location"
                    className="form-control"
                    value={formValues.location}
                  onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {locations.map((location:any)=>(<option key={location.locationId} value={location.locationName}> {location.locationName}</option>))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 form-group ">
                <label className="form-label">Sub Location</label>
                <div className="dropdown">
                  <select
                   name="subLocation"
                    className="form-control"
                    id="holidaySubLocation"
                    value={formValues.subLocation}
                  onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {location=="0" ? []: (subLocations.filter((subLocation:any)=>location==subLocation.locationName).map((subLocation:any)=>(<option key={subLocation.subLocationId} value={subLocation.subLocationName}>{subLocation.subLocationName}</option>)))}
                  </select>
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

export default EmployeeMaster;
