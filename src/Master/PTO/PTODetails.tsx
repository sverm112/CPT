import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
// import ModalDialog from '../../modal/modal';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Row } from "react-bootstrap";
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
import { employeeActions } from "../../Store/Slices/Employee";
import { GET_ALL_PTOS, GET_ALL_PTO_TYPES, GET_ALL_RESOURCES, POST_PTO, UPDATE_PTO } from "../../constants";

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
    name: "Year",
    selector: (row: { year: any }) => row.year,
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
  const ptos = useSelector((state: any) => state.Pto.data);
  const resourcesForPto = useSelector((state: any) => state.Pto.data)
  
  const resourceList = useSelector((state: any) => state.Employee.data);
  const resources = useSelector((state: any) => state.Employee.data);
  const toggle = useSelector((state: any) => state.Pto.toggle);
  const managerSelected = useSelector((state: any) => state.Pto.resourceManager);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updatePTODetails, setUpdatePTODetails] = useState({});
  const ptoTypes=useSelector((state:any)=>state.Filters.ptoTypes);
  const ptoTypeSelected = useSelector((state: any) => state.Pto.ptoTypes);
  const months=useSelector((state:any)=>state.Filters.months);
  const monthSelected = useSelector((state: any) => state.Pto.months);
  const years = useSelector((state: any) =>state.Filters.years);
  const status = useSelector((state: any) => state.Filters.status);
  const yearSelected = useSelector((state: any) => state.Pto.years);
  const statusSelected= useSelector((state:any)=>state.Pto.status)
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
      const response = await fetch(`${GET_ALL_PTOS}`);
      let dataGet = await response.json();
      dataGet=dataGet.map((row:any)=>({...row,startDate:row.startDate.slice(0,10) ,enddDate:row.enddDate.slice(0,10),updatedDate : row.updatedDate.slice(0,10),createdDate:row.createdDate.slice(0,10)}))
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
  {'name': 'End Date','selector':'enddDate', 'default': 'true' },
  {'name': 'Month','selector':'month', 'default': 'false' },
  {'name': 'Year','selector':'year', 'default': 'false' },
  {'name': 'Number of Days','selector':'numberOfDays', 'default': 'true' },
  {'name': 'Remarks','selector':'remarks', 'default': 'false' },
  {'name' :'Status','selector':'status','default':'true'},
  {'name' :'Created Date','selector':'createdDate','default':'true'},
  {'name' :'Created By','selector':'createdBy','default':'true'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},];
  //end constants for export
 let filteredColumns=columns;
    //Resource, Resource Manager, PTO Type, Month, Status 
  const resourceSelected = useSelector((state: any) => state.Pto.resourceName);

  

  const getEmployeeDetails = async () => {
    try {
      const response = await fetch(`${GET_ALL_RESOURCES}`);
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
      dispatch(employeeActions.changeData(dataGet));
    } catch {
      console.log("Error occured During Employee Fetch");
    }
  };
  const getPTOTypeDetails = async () => {
    const response = await fetch(`${GET_ALL_PTO_TYPES}`);
    const dataGet = await response.json();
    dispatch(filterActions.changePTOTypes(dataGet));
  }
  useEffect(() => {
    getEmployeeDetails();
    getPTOTypeDetails();
  }, []);

  const filteredPtos = ptos.filter(
    (pto: any) => {
      const resourceNameOptions = resourceSelected.map((resourceName: any) => resourceName.value);
      const managerNameOptions = managerSelected.map((managerName: any) => managerName.value);
      const ptoTypeOptions = ptoTypeSelected.map((ptoType: any) => ptoType.value);
      const monthOptions = monthSelected.map((month: any) => month.value);
      const yearOptions = yearSelected.map((year: any) => year.value);
      const statusOptions = statusSelected.map((status: any) => status.value);
      if((!resourceSelected.length) || (resourceSelected.length > 0 && resourceNameOptions.includes(pto.resourceName) == true)){
        if((!managerSelected.length) || (managerSelected.length > 0 && managerNameOptions.includes(pto.resourceManager) == true)){
          if((!ptoTypeSelected.length) || (ptoTypeSelected.length > 0 && ptoTypeOptions.includes(pto.ptoType) == true)){
            if((!monthSelected.length) || (monthSelected.length > 0 && monthOptions.includes(pto.month) == true)){
              if((!yearSelected.length) || (yearSelected.length > 0 && yearOptions.includes(pto.year) == true)){
                if ((!statusSelected.length) || (statusSelected.length > 0 && statusOptions.includes(pto.status))) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    }
  )

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
              {action == "Update" && <UpdateModal initialValues={updatePTODetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}

            </div>
          </div>
          <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Resource
              </label>
              <MultiSelect
                options={
                  resourceList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => ({label: resource.resourceName, value: resource.resourceName}))
                  // resourcesForPto.map((resource: any) => ({label: resource.resourceName, value: resource.resourceName}))
                }
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
                onChange={(event: any) => dispatch(ptoActions.changeResourceManager(event))}
                labelledBy="Select Manager"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                PTO Type
              </label>
              <MultiSelect
                options={ptoTypes.map((ptoType: any) => ({label:ptoType.ptoType, value: ptoType.ptoType }))}
                value={ptoTypeSelected}
                onChange={(event: any) => dispatch(ptoActions.changePtoType(event))}
                labelledBy="Select PTO Type"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Month
              </label>
              <MultiSelect
                options={months.map((month: any) => ({label:month, value: month }))}
                value={monthSelected}
                onChange={(event: any) => dispatch(ptoActions.changeMonth(event))}
                labelledBy="Select Month"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Year
              </label>
              <MultiSelect
                options={years.map((month: any) => ({label:month, value: month }))}
                value={yearSelected}
                onChange={(event: any) => dispatch(ptoActions.changeYears(event))}
                labelledBy="Select Month"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Status
              </label>
              <MultiSelect
                options={status.map((status: any) => ({ label: status, value: status }))}
                value={statusSelected}
                onChange={(event: any) => dispatch(ptoActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>

            
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(ptoActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table  columnsAndSelectors={columnsAndSelectors} columns={filteredColumns} data={filteredPtos} onRowDoubleClicked={handleRowDoubleClicked} customValueRenderer={customValueRenderer} title={title}/>
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
  const [ptoTypeId, setPTOTypeId] = useState("0");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [month, setMonth] = useState("0");
  const [remarks,setRemarks]=useState("");
  let numberOfDays=0,selectedResourceDetails={resourceId:0,resourceName:"",resourceManager:""};
  const resetFormFields = () => {
    setResourceId("0");
    setPTOTypeId("0");
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
    const startYear = startDate?.getFullYear();
    const endYear = endDate?.getFullYear();
    let payload = [{}];
    let ptoStartDate=null,ptoEndDate=null;
    if(startDate!=null){
      ptoStartDate= new Date(startDate);
      ptoStartDate.setDate(ptoStartDate.getDate() + 1);
    }
    if(endDate!=null){
      ptoEndDate= new Date(endDate);
      ptoEndDate.setDate(ptoEndDate.getDate() + 1);
    }
    // if(startYear == endYear){
      payload = [{
        resourceId : Number(resourceId),
        resourceName : selectedResourceDetails.resourceName,
        resourceManager : selectedResourceDetails.resourceManager,
        ptoTypeId : Number(ptoTypeId),
        startDate : ptoStartDate,
        enddDate : ptoEndDate,
        month : months[Number(startDate?.getMonth()) % 12 || 0],
        year : startYear,
        numberOfDays : numberOfDays,
        remarks : remarks,
        createdBy: "Admin"
      }];
    // }else{
    //   payload = [{
    //     resourceId : Number(resourceId),
    //     resourceName : selectedResourceDetails.resourceName,
    //     resourceManager : selectedResourceDetails.resourceManager,
    //     ptoTypeId : Number(ptoTypeId),
    //     startDate : startDate,
    //     enddDate : endDate,
    //     month : months[Number(startDate?.getMonth()) % 12 || 0],
    //     year : startYear,
    //     numberOfDays : numberOfDays,
    //     remarks : remarks,
    //     createdBy: "Admin"
    //   },
    //   {
    //     resourceId : Number(resourceId),
    //     resourceName : selectedResourceDetails.resourceName,
    //     resourceManager : selectedResourceDetails.resourceManager,
    //     ptoTypeId : Number(ptoTypeId),
    //     startDate : startDate,
    //     enddDate : endDate,
    //     month : months[Number(endDate?.getMonth()) % 12 || 0],
    //     year : endYear,
    //     numberOfDays : numberOfDays,
    //     remarks : remarks,
    //     createdBy: "Admin"
    //   }
    // ];
    // }
    // console.log("Months:" ,months[startDate?.getMonth() || 0]);
    try {
      if(validateForm('#AddPtoForm')){
        for(const pl of payload){
          const response = await fetch(`${POST_PTO}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pl),
          });
          console.log(pl);
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
        }
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
        <i className="las la-plus"></i> Add PTO
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New PTO</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id='AddPtoForm' noValidate>
          <div className="row">
              <div className="col-md-6 form-group" id="ResourceAddPto">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select className="form-control" required id="resource" value={resourceId} 
                  onBlur={()=>validateSingleFormGroup(document.getElementById('ResourceAddPto'), 'select')} onChange={setResourceDetails}>
                    <option value="0">Select</option>
                    {/* {months.map((month: any) => (<option key={month} value={month}>{month}</option>))} */}
                  
                    {resourceList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                  <div className="error"></div>
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
              <div className="col-md-6 form-group" id="PTOTypeDropdown">
                <label className="form-label" htmlFor="ptoType">
                  PTO Type 
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control "
                    id="ptoTypeDropdown"
                    value={ptoTypeId}
                    onBlur={()=>validateSingleFormGroup(document.getElementById('PTOTypeDropdown'),'select')}
                    onChange={(event) => setPTOTypeId(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {ptoTypes.map((ptoType: any) => (<option key={ptoType.id} value={ptoType.id.toString()}>{ptoType.ptoType}</option>))}
                  </select>
                  <div className="error"></div>
                </div>
              </div>

              <div className="col-md-6 form-group" id="PTOStartDate">
                <label className="form-label" htmlFor="ptoStartDate" style={{ zIndex: "9" }}>
                 PTO Start Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  onChange={setStartDate}
                  value={startDate}
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('PTOStartDate'),'datePicker')}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="PTOEndDate">
                <label className="form-label" htmlFor="ptoEndDate" style={{ zIndex: "9" }}>
                  PTO End Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  onChange={setEndDate}
                  value={endDate}
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('PTOEndDate'),'datePicker')}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
              </div>
              {/* <div className="col-md-6 form-group" id="PtoMonth">
                <label className="form-label" htmlFor="month">
                  Month 
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control "
                    id="monthDropdown"
                    value={month}
                    onBlur={()=>validateSingleFormGroup(document.getElementById('PtoMonth'),'select')}
                    onChange={(event) => setMonth(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {months.map((month: any) => (<option key={month} value={month}>{month}</option>))}
                  </select>
                <div className="error"></div>
                </div>
              </div> */}
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
                  cols={100} 
                  rows={1}
                  maxLength={100}
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

const UpdateModal = (props: any) => {
  const dispatch = useDispatch();
  const resourceList = useSelector((state: any) => state.Employee.data);
  const months=useSelector((state:any)=>state.Filters.months);
  const ptoTypes=useSelector((state:any)=>state.Filters.ptoTypes);
  const [formValues, setFormValues] = useState(props.initialValues || {});
  const [startDate, setStartDate] = useState<Date | null>(new Date(props.initialValues.startDate));
  const [endDate, setEndDate] = useState<Date | null>(new Date(props.initialValues.enddDate));
  let numberOfDays=0,selectedResourceDetails={resourceId:0,resourceName:"",resourceManager:""};
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
  if(formValues.resourceId!="0"){
    const filteredResource = resourceList.filter((resource: any) => resource.resourceId == Number(formValues.resourceId));
    selectedResourceDetails.resourceId = filteredResource[0].resourceId
    selectedResourceDetails.resourceName = filteredResource[0].resourceName
    selectedResourceDetails.resourceManager = filteredResource[0].manager
  }
  const formSubmitHandler = async (event: any) => {
    
    event.preventDefault();

    const startYear = startDate?.getFullYear();
    let ptoStartDate=null,ptoEndDate=null;
    if(startDate!=null){
      ptoStartDate= new Date(startDate);
      ptoStartDate.setDate(ptoStartDate.getDate() + 1);
    }
    if(endDate!=null){
      ptoEndDate= new Date(endDate);
      ptoEndDate.setDate(ptoEndDate.getDate() + 1);
    }
    let payload = {
      id : formValues.id,
      resourceId : Number(formValues.resourceId),
      ptoTypeId : Number(formValues.ptoTypeId),
      startDate : ptoStartDate,
      enddDate : ptoEndDate,
      month : months[Number(startDate?.getMonth()) % 12 || 0],
      year: startYear,
      numberOfDays : numberOfDays,
      remarks : formValues.remarks,
      status: formValues.status,
      updatedBy: "Admin",
    };
    try {
      if(validateForm('#UpdatePtoForm')){
        const response = await fetch(`${UPDATE_PTO}`, {
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
            dispatch(ptoActions.changeToggle());
            props.closeModal();
            toast.success("PTO Updated Successfully")
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

  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px", padding:"3px 6px 4px 6px", borderRadius:"4px" }}
        
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Update PTO
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update PTO</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id='UpdatePtoForm' noValidate>
          <div className="row">
              <div className="col-md-6 form-group" id="ResourceAddPto">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select required className="form-control" name="resourceId" id="resource" value={formValues.resourceId} onBlur={()=>validateSingleFormGroup(document.getElementById('ResourceAddPto'), 'select')} onChange={handleChange}>
                    <option value="0">Select</option>
                    {resourceList.filter((resource: any) => resource.isActive == "Active").map((resource: any) => <option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                  <div className="error"></div>
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
              <div className="col-md-6 form-group" id="PtoType">
                <label className="form-label" htmlFor="ptoType">
                  PTO Type 
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    name="ptoTypeId"
                    id="ptoTypeDropdown"
                    value={formValues.ptoTypeId}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {ptoTypes.map((ptoType: any) => (<option key={ptoType.id} value={ptoType.id.toString()}>{ptoType.ptoType}</option>))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 form-group" id="UpdatePTOStartDate">
                <label className="form-label" htmlFor="ptoStartDate" style={{ zIndex: "9" }}>
                 PTO Start Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  name="startDate"
                  onChange={setStartDate}
                  value={startDate}
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('UpdatePTOStartDate'),'datePicker')}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="UpdatePTOEndDate">
                <label className="form-label" htmlFor="ptoEndDate" style={{ zIndex: "9" }}>
                  PTO End Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  className="form-control"
                  required
                  name="endDate"
                  onChange={setEndDate}
                  value={endDate}
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('UpdatePTOEndDate'),'datePicker')}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
              </div>
              {/* <div className="col-md-6 form-group" id="PtoMonth">
                <label className="form-label" htmlFor="month">
                  Month 
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    name="month"
                    id="monthDropdown"
                    onBlur={()=>validateSingleFormGroup(document.getElementById('PtoMonth'),'select')}
                    value={formValues.month}
                    onChange={handleChange}
                  >
                    <option value="0">Select</option>
                    {months.map((month: any) => (<option key={month} value={month}>{month}</option>))}
                  </select>
                  <div className="error"></div>
                </div>
              </div> */}
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
                  name="remarks"
                  cols={100}
                  rows={1}
                  maxLength={100}
                  id="remarks"
                  value={formValues.remarks}
                  onChange={handleChange}
                />
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
                    <option value="InActive">InActive</option>
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


export default PTO;
