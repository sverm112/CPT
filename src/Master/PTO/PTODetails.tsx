import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
// import ModalDialog from '../../modal/modal';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Table from "../../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import DownloadBtn from "../../Export/DownloadBtn";
import { validateForm, validateSingleFormGroup } from "../../utils/validations";
import { ptoActions } from "../../Store/Slices/Pto";
import { filterActions } from "../../Store/Slices/Filters";
import DatePicker from "react-date-picker";

const columns = [
  {
    name: "Resource",
    selector: (row: { resourceName: any }) => row.resourceName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Manager",
    selector: (row: { resourceManager: any }) => row.resourceManager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "PTO Type",
    selector: (row: { ptoType: any }) => row.ptoType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Start Date",
    selector: (row: { startDate: any }) => row.startDate,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "End Date",
    selector: (row: { enddDate: any }) => row.enddDate,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Month",
    selector: (row: { month: any }) => row.month,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Number of Days",
    selector: (row: { numberOfDays: any }) => row.numberOfDays,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Remarks",
    selector: (row: { remarks: any }) => row.remarks,
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

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((pto: any) => pto.label).join(", ");
};

const PTO = () => {
  const dispatch = useDispatch();
  // const resources = useSelector((state: any) => state.Employee.data);
  const managers: any = [];
  const resources = useSelector((state: any) => state.Pto.data);
  const toggle = useSelector((store: any) => store.Pto.toggle);
  const resourceList = useSelector((state: any) => state.Employee.data);
  const managerSelected = useSelector((state: any) => state.Employee.manager);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updatePTODetails, setUpdatePTODetails] = useState({});
  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }

  resources.map((resource: any) => {
    if (managers.indexOf(resource.manager) === -1) {
      managers.push(resource.manager);
    }
  })

  const getPTODetails = async () => {
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/PTOs/GetAllPTOs");
      let dataGet = await response.json();
      dispatch(ptoActions.changeData(dataGet));
    }
    catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getPTODetails();
  }, [toggle]);

  const handleRowDoubleClicked = (row: any) => {
    console.log(row);
    setShowModal(true);
    setAction("Update");
    let data = { ...row }
    console.log(data);
    setUpdatePTODetails(data);
  };

  //start constants for export
  const selectors = ['resourceName', 'resourceManager', 'ptoType','startDate', 'endDate', 'month', 'numberOfDays', 'remarks', 'isActive', 'createdDate', 'createdBy']
  const title = "PTO Details";

  const columnsAndSelectors=[
  {'name' :'Resource','selector':'resourceName','default':'true'},
  {'name' :'Resource Manager','selector':'resourceManager','default':'true'},
  {'name': 'PTO Type', 'selector': 'ptoType', 'default': 'true' },
  {'name': 'Start Date', 'selector': 'startDate', 'default': 'true'},
  {'name': 'End Date','selector':'endDate', 'default': 'true' },
  {'name': 'Month','selector':'month', 'default': 'true' },
  {'name': 'Number of Days','selector':'numberOfDays', 'default': 'true' },
  {'name': 'Remarks','selector':'remarks', 'default': 'false' },
  {'name' :'Status','selector':'isActive','default':'true'},
  {'name' :'Created Date','selector':'createdDate','default':'true'},
  {'name' :'Created By','selector':'createdBy','default':'true'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},];
  //end constants for export
 let filteredColumns=columns;
    //Resource, Resource Manager, PTO Type, Month, Status 
    const resourceSelected = useSelector((state: any) => state.Pto.resourceName);
    const ptoTypes = [
      { label: "Privileged", value: "Privileged" },
      { label: "Casual", value: "Casual" },
      { label: "Sick", value: "Sick" },
    ];
    const month = [
      { label: "January", value: "January" },
      { label: "February", value: "February" },
      { label: "March", value: "March" },
      { label: "April", value: "April" },
      { label: "May", value: "May" },
      { label: "June", value: "June" },
      { label: "July", value: "July" },
      { label: "August", value: "August" },
      { label: "September", value: "September" },
      { label: "October", value: "October" },
      { label: "November", value: "November" },
      { label: "December", value: "December" },
    ];
  
  const status = useSelector((state: any) => state.Filters.status);

  const changeResourceHandler = (event: any) => {
    dispatch(ptoActions.changeResourceName(event));
  }
  const changeManagerSelectedHandler = (event: any) => {
    dispatch(ptoActions.changerResourceManager(event));
  }
  const changePtoTypeHandler = (event: any) => {
    dispatch(ptoActions.changePtoType(event));
  }
  const changeMonthHandler = (event: any) => {
    dispatch(ptoActions.changeMonth(event));
  }
  const changeStatusHandler = (event: any) => {
    dispatch(ptoActions.changeStatus(event));
  }
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">PTO Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>PTO</span>
            </p>
            <div className="btns market">
              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {/* {action == "Update" && <UpdateModal initialValues={updatePTODetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />} */}

            </div>
          </div>
          <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Resource
              </label>
              <MultiSelect
                options={resourceList}
                value={resourceSelected}
                onChange={(event: any) => dispatch(ptoActions.changeResourceName(event))}
                labelledBy="Select Resource"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Manager
              </label>
              <MultiSelect
                options={(managers.map((manager: any) => ({ label: manager, value: manager })))}
                value={managerSelected}
                onChange={(event: any) => dispatch(ptoActions.changerResourceManager(event))}
                labelledBy="Select Manager"
                valueRenderer={customValueRenderer}
              />
            </div>

            
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(ptoActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table  columnsAndSelectors={columnsAndSelectors} columns={filteredColumns} data={resources} onRowDoubleClicked={handleRowDoubleClicked} customValueRenderer={customValueRenderer} title={title}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddModal = (props: any) => {
  const dispatch = useDispatch();


  const resourceList = useSelector((state: any) => state.Employee.data);
  const months=useSelector((state:any)=>state.Filters.months);
  const ptoTypes=useSelector((state:any)=>state.Filters.ptoTypes);
  const [resourceId, setResourceId] = useState("0");
  const [ptoType, setPTOType] = useState("0");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [month, setMonth] = useState("0");
  const [remarks,setRemarks]=useState("");
  let numberOfDays=0,selectedResourceDetails={resourceId:0,resourceName:"",resourceManager:""};
  const resetFormFields = () => {
    setResourceId("0");
    setPTOType("0");
    setStartDate(null);
    setEndDate(null);
    setMonth("0");
    setRemarks("");
  }
  const calculateNumberOfDays = (startDate: Date, endDate: Date) => {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
  if(startDate!=null && endDate!=null){
    numberOfDays=calculateNumberOfDays(startDate,endDate);
  }
  if(resourceId!="0"){
    const filteredResource = resourceList.filter((resource: any) => resource.resourceId == Number(resourceId));
    selectedResourceDetails.resourceId = filteredResource[0].resourceId
    selectedResourceDetails.resourceName = filteredResource[0].resourceName
    selectedResourceDetails.resourceManager = filteredResource[0].manager
  }
  const setResourceDetails = (event: any) => {
    console.log(selectedResourceDetails, event.target.value)
    setResourceId(event.target.value);
  };
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      resourceId : Number(resourceId),
      resourceName : selectedResourceDetails.resourceName,
      resourceManager : selectedResourceDetails.resourceManager,
      ptoType : Number(ptoType),
      startDate : startDate,
      enddDate : endDate,
      month : month,
      numberOfDays : numberOfDays,
      remarks : remarks,
      createdBy: "Admin"
    };
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/PTOs/PostPTO", {
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

          dispatch(ptoActions.changeToggle());
          resetFormFields();
          props.closeModal();
          toast.success("PTO Added Successfully")
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
        <i className="las la-plus"></i> Add PTO
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New PTO</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
          <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <div className="dropdown">
                  <select className="form-control" id="resource" value={resourceId} onChange={setResourceDetails}>
                    <option value="0">Select</option>
                    {resourceList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceManager">
                  Manager
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supervisor"
                  value={selectedResourceDetails.resourceManager}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ptoType">
                  PTO Type 
                </label>
                <div className="dropdown">
                  <select
                    className="form-control "
                    id="ptoTypeDropdown"
                    value={ptoType}
                    onChange={(event) => setPTOType(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {ptoTypes.map((ptoType: any) => (<option key={ptoType} value={ptoType}>{ptoType}</option>))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ptoStartDate" style={{ zIndex: "9" }}>
                 PTO Start Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setStartDate}
                  value={startDate}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ptoEndDate" style={{ zIndex: "9" }}>
                  PTO End Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setEndDate}
                  value={endDate}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="month">
                  Month 
                </label>
                <div className="dropdown">
                  <select
                    className="form-control "
                    id="monthDropdown"
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {months.map((month: any) => (<option key={month} value={month}>{month}</option>))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ptoDays">
                  No. Of Days
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ptoDays"
                  value={numberOfDays}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="remarks">
                  Remarks
                </label>
                <textarea
                  className="form-control"
                  id="remarks"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
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
}

// const UpdateModal = (props: any) => {
//   const dispatch = useDispatch();
//   const marketList = useSelector((state: any) => state.Market.data);
//   const [formValues, setFormValues] = useState(props.initialValues || {});
//   const formSubmitHandler = async (event: any) => {
//     event.preventDefault();
//     let payload = {
//       pkProjectID: formValues.pkProjectID,
//       projectCode: formValues.projectCode,
//       projectName: formValues.projectName,
//       projectModel: formValues.projectModel,
//       expenseType: formValues.expenseType,
//       fkMarketID: formValues.fkMarketID == "0" ? 0 : Number(formValues.fkMarketID),
//       programManager: formValues.programManager,
//       isActive: formValues.isActive == "2" ? "0" : "1",
//       updatedBy: "Admin",
//     };
//     try {
//       const response = await fetch("http://10.147.172.18:9190/api/v1/Projects/UpdateProjects", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//       const dataResponse = await response.json();
//       if (dataResponse.length) {
//         if (dataResponse[0].statusCode == "201") {
//           console.log(dataResponse[0].statusReason);
//           console.log(dataResponse[0].recordsCreated);
//           dispatch(projectActions.changeToggle());
//           props.closeModal();
//           toast.success("Project Updated Successfully")
//         } else toast.error(dataResponse[0].errorMessage);
//       } else toast.error("Some Error occured.");
//     } catch {
//       toast.error("Some Error occured.");
//     }
//   };


//   const handleChange = (e: any) => {
//     console.log("Update")
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <>
//       <Button
//         className="btn btn-primary"
//         style={{ float: "right", marginTop: "-68px" }}
//         variant="primary"
//         onClick={props.openModal}
//       >
//         <i className="las la-plus"></i> Update Project
//       </Button>
//       <Modal show={props.showModal} onHide={props.closeModal}>
//         <Modal.Header closeButton onClick={props.closeModal}>
//           <Modal.Title>
//             <h6>Update Project</h6>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={formSubmitHandler}>
//             <div className="row">
//               <div className="col-md-6 form-group" id="ProjectCodeInput">
//                 <label className="form-label" htmlFor="projectCode">
//                   Project Code
//                 </label>
//                 <span className="requiredField">*</span>
//                 <input
//                   required
//                   type="text"
//                   name="projectCode"
//                   className="form-control"
//                   id="projectCode"
//                   value={formValues.projectCode}
//                   onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectCodeInput'), 'input')}
//                   onChange={handleChange}
//                 />
//                 <div className="error"></div>
//               </div>
//               <div className="col-md-6 form-group" id="ProjectNameInput">
//                 <label className="form-label" htmlFor="projectName">
//                   Project Name
//                 </label>
//                 <span className="requiredField">*</span>
//                 <input
//                   required
//                   type="text"
//                   name="projectName"
//                   className="form-control"
//                   id="projectName"
//                   value={formValues.projectName}
//                   onBlur={()=> validateSingleFormGroup(document.getElementById('ProjectNameInput'), 'input')}
//                   onChange={handleChange}
//                 />
//                 <div className="error"></div>
//               </div>
//               <div className="col-md-6 form-group" id="ProjectModelDropdown">
//                 <label className="form-label" htmlFor="projectModel">
//                   Project Model
//                 </label>
//                 <span className="requiredField">*</span>
//                 <div className="dropdown">
//                   <select
//                     name="projectModel"
//                     className="form-control"
//                     id="projectModel"
//                     value={formValues.projectModel}
//                     onBlur = {()=>validateSingleFormGroup(document.getElementById('ProjectModelDropdown'),'select')}
//                     onChange={handleChange}
//                   >
//                     <option value="0">Select</option>
//                     <option value="Waterfall">Waterfall</option>
//                     <option value="Kanban">Kanban</option>
//                     <option value="Scrum">Scrum</option>
//                     <option value="Agile">Agile</option>
//                   </select>
//                   <div className="error"></div>
//                 </div>
//               </div>
//               <div className="col-md-6 form-group" id="MarketInput">
//                 <label className="form-label" htmlFor="projectMarket">
//                   Market
//                 </label>
//                 <span className="requiredField">*</span>
//                 <div className="dropdown">
//                   <select
//                     required
//                     name="fkMarketID"
//                     className="form-control"
//                     id="projectMarket"
//                     value={formValues.fkMarketID}
//                     onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketInput'),'select')}
//                     onChange={handleChange}
//                   >
//                     <option value="0">Select</option>
//                     {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.id.toString()}>{market.marketName}</option>)}
//                   </select>
//                   <div className="error"></div>
//                 </div>
//               </div>
//               <div className="col-md-6 form-group">
//                 <label className="form-label" htmlFor="expenseType">
//                   Expense Type
//                 </label>
//                 <div className="dropdown">
//                   <select
//                     name="expenseType"
//                     className="form-control"
//                     id="expenseType"
//                     value={formValues.expenseType}
//                     onChange={handleChange}
//                   >
//                     <option value="0">Select</option>
//                     <option value="CAPEX">CAPEX</option>
//                     <option value="OPEX">OPEX</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="col-md-6 form-group" id="ProgramManager">
//                 <label className="form-label" htmlFor="programManager">
//                   Program Manager
//                 </label>
//                 <span className="requiredField">*</span>
//                 <input
//                   required
//                   name="programManager"
//                   type="text"
//                   className="form-control"
//                   id="programManager"
//                   value={formValues.programManager}
//                   onBlur = {()=>validateSingleFormGroup(document.getElementById('ProgramManager'), 'input')}
//                   onChange={handleChange}
//                 />
//                 <div className="error"></div>
//               </div>
//               <div className="col-md-6 form-group ">
//                 <label className="form-label">Status</label>
//                 <div className="dropdown">
//                   <select
//                     name="isActive"
//                     className="form-control"
//                     id="statusDropdown"
//                     value={formValues.isActive}
//                     onChange={handleChange}
//                   >
//                     <option value="0">Select</option>
//                     <option value="1">Active</option>
//                     <option value="2">InActive</option>
//                   </select>
//                 </div>
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
//       </Modal>
//     </>
//   );
// }

export default PTO;
