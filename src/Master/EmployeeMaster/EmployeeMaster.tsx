import SideBar from "../../SideBar/SideBar";
import { Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DatePicker from "react-date-picker";
import { useState, FC, useEffect } from "react";
import React from "react";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useSelector, useDispatch } from "react-redux";
import { employeeActions } from "../../Store/Slices/Employee";
import * as FileSaver from "file-saver";
//import XLSX from 'sheetjs-style';
import { read, utils, writeFile } from "xlsx";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";

const columns = [
  // {
  //   name: "Employee Id",
  //   selector: (row: { resourceId: any }) => row.resourceId,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
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

let resources = [];
// let data = [
//   {
//     employeeId: 10049,
//     resource: "Bibek Khatiwada",
//     role: " Developer",
//     emailAddress: "",
//     resourceType: "GTM",
//     location: "US",
//     subLocation: "",
//     resourceMarket: "CA",
//     manager: "Vipul Suri",
//     active: "Yes",
//     createdBy: "Admin",
//   },
//   {
//     employeeId: 10020,
//     resource: "Mohan Ganesh,D",
//     role: "Technical Analyst",
//     emailAddress: "",
//     resourceType: "OGS",
//     location: "India",
//     subLocation: "",
//     resourceMarket: "CA",
//     manager: "Ashish Khare",
//     active: "Yes",
//     createdBy: "Admin",
//   },

//   {
//     employeeId: 10047,
//     resource: " Singh, Ajay",
//     role: " Developer",
//     emailAddress: "",
//     resourceType: "OGS",
//     location: "India",
//     subLocation: "",
//     resourceMarket: "CA",
//     manager: "Ashish Khare",
//     active: "Yes",
//     createdBy: "Admin",
//   },
//   {
//     employeeId: 10036,
//     resource: "Sivaruban Vinesparamoorthy",
//     role: "QA",
//     emailAddress: "",
//     resourceType: "FTE",
//     location: "US",
//     subLocation: "",
//     resourceMarket: "CA",
//     manager: "Vipul Suri",
//     active: "Yes",
//     createdBy: "Admin",
//   },
// ];

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else if (selected.length == "1") return selected[0].label;
  else return selected.length + " items selected";
};

const EmployeeMaster = () => {
  const dispatch = useDispatch();
  const markets = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];
  const roles = [
    { label: "Developer", value: "Developer" },
    { label: "Dev Manager", value: "Dev Manager" },
    { label: "QA", value: "QA" },
    { label: "QA Manager", value: "QA Manager" },
    { label: "Sr. Developer", value: "Sr. Developer" },
    { label: "Sr. QA", value: "Sr. QA" },
    { label: "Technical Lead", value: "Technical Lead" },
  ];
  const resourceTypes = [
    { label: "OGS", value: "OGS" },
    { label: "GTM", value: "GTM" },
    { label: "FTE", value: "FTE" },
  ];
  const status = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];
  const toggle = useSelector((state: any) => state.Employee.toggle);
  const resources = useSelector((state: any) => state.Employee.data);
  const marketList=useSelector((state: any) => state.Market.data);
  const marketSelected = useSelector((state: any) => state.Employee.market);
  const roleSelected = useSelector((state: any) => state.Employee.role);
  const resourceTypeSelected = useSelector((state: any) => state.Employee.resourceType);
  const statusSelected = useSelector((state: any) => state.Employee.status);

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
      dataGet = dataGet.map((row: any) => ({ ...row, isActive : row.isActive==1 ? "Active" : "Inactive" }));
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
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);

  const resourceColumns = [
    ["ResourceName", "ResourceType", "Role", "ResourceMarket", "EmailAddress", "Location", "SubLocation", "Manager"],
  ];
  const handleDownloadTemplate = async () => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // const wb= XLSX.utils.book_new();
    // const ws=XLSX.utils.json_to_sheet([]);
    // XLSX.utils.sheet_add_aoa(ws,resourceColumns);
    //const wb={Sheets :{'ResourceTemplate':ws},SheetNames:['ResourceTemplate']};
    // const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
    // const data=new Blob([excelBuffer],{type:fileType});
    // FileSaver.saveAs(data,"Resources"+fileExtension)

    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, resourceColumns);
    utils.book_append_sheet(wb, ws, "ResourceTemplate");
    writeFile(wb, "Resource.xlsx");
  };

  const [path, setPath] = useState("");
  const [uploadedResourcesData, setUploadedResourcesData] = useState([]);
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
          //setUploadedResourcesData(rows);
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
      //const resourceRow=JSON.stringify(resource);
      console.log(statusOptions);
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

              <ModalDialog />
            </div>
          </div>
          <div className="row filter-row">
            
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Role
              </label>
              <MultiSelect
                options={roles}
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
                options={resourceTypes}
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
                options={status}
                value={statusSelected}
                onChange={changeStatusSelectHandler}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
          </div>

          <Table columns={columns} data={filteredResources} />
        </div>
      </div>
    </div>
  );
};

// function ModalDialog() {
//   const [isShow, invokeModal] = useState(false);
//   const initModal = () => {
//     return invokeModal(!false);
//   };

//   function closeModal() {
//     return invokeModal(false);
//   }

//   return (
//     <>
//       <Button
//         className="btn btn-primary"
//         style={{ float: "right", marginTop: "-68px" }}
//         variant="primary"
//         onClick={initModal}
//       >
//         <i className="las la-plus"></i> Add Employee
//       </Button>
//       <Modal show={isShow}>
//         <Modal.Header closeButton onClick={closeModal}>
//           <Modal.Title>
//             <h6>Add New Employee</h6>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/*
//                     <form className="form-capsule">
//                         <div className="row">
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="employeeId">Employee Id</label>
//                                 <i className="fa fa-id-card"></i>
//                                 <input type="text" className="form-control" id="employeeId" placeholder="10001" />
//                             </div>
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="resource">Resource</label>
//                                 <i className="fa fa-user"></i>
//                                 <input type="text" className="form-control" id="resource"/>
//                             </div>
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="employeeRole">Role</label>
//                                 <select className="form-control" id="employeeRole">
//                                     <option value="0">Select</option>
//                                     <option value="1">Developer</option>
//                                     <option value="2">QA</option>
//                                     <option value="3">Technical Analyst</option>
//                                 </select>
//                             </div>
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="employeeEmailAddress">Email Address</label>
//                                 <i className="fa fa-envelope"></i>
//                                 <input type="text" className="form-control" id="employeeEmailAddress"/>
//                             </div>

//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="resourceType">Type</label>
//                                 <i className="fa fa-sitemap"></i>
//                                 <select className="form-control" id="resourceType">
//                                     <option value="0">Select</option>
//                                     <option value="1">OGS</option>
//                                     <option value="2">GTM</option>
//                                     <option value="3">FTE</option>
//                                 </select>
//                             </div>

//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="location">Location</label>
//                                 <i className="fa fa-map-marker"></i>
//                                 <select className="form-control" id="location">
//                                     <option value="0">Select</option>
//                                     <option value="1">On Shore</option>
//                                     <option value="2">Off Shore</option>
//                                 </select>
//                             </div>

//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="subLocation">Sub Location</label>
//                                 <i className="fa fa-map-marker"></i>
//                                 <input type="text" className="form-control" id="subLocation"/>
//                             </div>
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="market">Market</label>
//                                 <select className="form-control" id="market">
//                                     <option value="0">Select</option>
//                                     <option value="1">CA</option>
//                                 </select>
//                             </div>
//                             <div className="col-md-6 form-group">
//                                 <label className="form-label" htmlFor="manager">Manager</label>
//                                 <i className="fa fa-user"></i>
//                                 <input type="text" className="form-control" id="manager"/>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <button type="submit" className="btn btn-primary" style={{ float: "right" }} >Submit</button>
//                             </div>
//                         </div>
//                     </form>
//                     */}

//           <form>
//             <div className="row">
//               <div className="col-md-6 form-group">
//                 <label className="form-label">Employee Id</label>
//                 <input type="text" className="form-control" id="employeeId" />
//               </div>
//               <div className="col-md-6 form-group">
//                 <label className="form-label">Resource</label>
//                 <input type="text" className="form-control" id="resource" />
//               </div>

//               <div className="col-md-6 form-group ">
//                 <label className="form-label">Role</label>
//                 <div className="dropdown">
//                   <select id="employeeRole" className="form-control">
//                     <option value="0">Select</option>
//                     <option value="1">Developer</option>
//                     <option value="2">QA</option>
//                     <option value="3">Technical Analyst</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6 form-group">
//                 <label className="form-label">Manager</label>
//                 <input type="text" className="form-control" id="manager" />
//               </div>

//               <div className="col-md-6 form-group">
//                 <label className="form-label">Resource Type</label>
//                 <div className="dropdown">
//                   <select id="resourceType" className="form-control">
//                     <option value="0">Select</option>
//                     <option value="1">OGS</option>
//                     <option value="2">GTM</option>
//                     <option value="3">FTE</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6 form-group">
//                 <label className="form-label">Location</label>
//                 <div className="dropdown">
//                   <select id="location" className="form-control">
//                     <option value="0">Select</option>
//                     <option value="1">US</option>
//                     <option value="2">India</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6 form-group ">
//                 <label className="form-label">Sub Location</label>
//                 <input type="text" className="form-control" id="subLocation" />
//               </div>
//               <div className="col-md-6 form-group">
//                 <label className="form-label">Market</label>
//                 <div className="dropdown">
//                   <select id="market" className="form-control">
//                     <option value="0">Select</option>
//                     <option value="1">AppleCare</option>
//                     <option value="2">Beaver</option>
//                     <option value="3">CA</option>
//                     <option value="4">HCP</option>
//                     <option value="5">Monarch</option>
//                     <option value="6">NAMM</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-md-6 form-group">
//                 <label className="form-label">Email Address</label>
//                 <input type="text" className="form-control" id="employeeEmailAddress" />
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </Modal.Body>
//         {/* <Modal.Footer>
//                     <Button variant="danger" onClick={closeModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer> */}
//       </Modal>
//     </>
//   );
// }

const ModalDialog = () => {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };

  function closeModal() {
    return invokeModal(false);
  }
  const USSubLocations = ["Washington"];
  const IndiaSubLocations = ["Gurgaon", "Noida", "Hyderabad", "Bangalore"];
  let values = null;
  let options = null;

  
  const dispatch = useDispatch();
  const marketList=useSelector((state: any) => state.Market.data);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [role, setRole] = useState("0");
  const [manager, setManager] = useState("");
  const [resourceType, setResourceType] = useState("0");
  const [location, setLocation] = useState("0");
  const [subLocation, setSubLocation] = useState("0");
  const [market, setMarket] = useState("0");
  const [employeeEmailAddress, setEmployeeEmailAddress] = useState("");
  if (location == "US" ) {
    values = USSubLocations;
  } else if (location == "India") {
    values = IndiaSubLocations;
  }

  if (values) {
    options = values.map((el) => <option key={el}>{el}</option>);
  }
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
          closeModal();
          toast.success("Resource Added Successfully")
        } else toast.error(dataResponse[0].errorMessage);
      } else toast.error("Some Error occured.");
    } catch {
      toast.error("Some Error occured.");
    }
  };

  const getMarketDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets");
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);

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
        onClick={initModal}
      >
        <i className="las la-plus"></i> Add Employee
      </Button>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton onClick={closeModal}>
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
                    <option value="Developer">Developer</option>
                    <option value="Dev Manager">Dev Manager</option>
                    <option value="QA">QA</option>
                    <option value="QA Manager">QA Manager</option>
                    <option value="Sr. Developer">Sr. Developer</option>
                    <option value="Sr. QA">Sr. QA</option>
                    <option value="Technical Lead">Technical Lead</option>
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
                    <option value="OGS">OGS</option>
                    <option value="GTM">GTM</option>
                    <option value="FTE">FTE</option>
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
                    {marketList.map((market:any)=><option key={market.pkMarketID} value={market.marketName}>{market.marketName}</option>)}
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
                    <option value="US">US</option>
                    <option value="India">India</option>
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
                     {options} 
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

export default EmployeeMaster;
