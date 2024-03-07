import { useState, useEffect } from "react";
import SideBar from "../../SideBar/SideBar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { MultiSelect } from "react-multi-select-component";
import Table from "../../DataTable/DataTable";
import { holidayActions } from "../../Store/Slices/Holiday";
import { useDispatch, useSelector } from "react-redux";
import { marketActions } from "../../Store/Slices/Market";
import { locationSublocationActions } from "../../Store/Slices/LocationSublocation";
import { toast } from "react-toastify";
import { filterActions } from "../../Store/Slices/Filters";
import { modalFilterActions } from '../../Store/Slices/ModalFilters';
import { PatternsAndMessages } from "../../utils/ValidationPatternAndMessage";
import { validateForm, validateSingleFormGroup } from "../../utils/validations";
import { BULK_POST_HOLIDAY, DELETE_HOLIDAY, GET_ALL_HOLIDAYS, GET_ALL_LOCATIONS, GET_ALL_MARKETS, GET_ALL_SUB_LOCATIONS, POST_HOLIDAY, UPDATE_HOLIDAY } from "../../constants";
import { propTypes } from "react-bootstrap/esm/Image";
import { RotatingLines } from "react-loader-spinner";
import { closeNav } from "../../SideBar/SideBarJs";

//Data Table
const columns = [
  {
    name: "Occasion",
    selector: (row: { occasionName: any }) => row.occasionName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Holiday Date",
    selector: (row: { holidayDateString: any }) => row.holidayDateString,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { marketName: any }) => row.marketName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Location",
    selector: (row: { locationName: any }) => row.locationName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Sub Location",
    selector: (row: { subLocationName: any }) => row.subLocationName,
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

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};

const HolidayMaster = () => {

  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);
  const status = useSelector((state: any) => state.Filters.status);
  const marketList = useSelector((state: any) => state.Market.data);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updateHolidayDetails, setUpdateHolidayDetails] = useState({});

  const marketSelected = useSelector((store: any) => store.Holiday.market);
  const locationSelected = useSelector((store: any) => store.Holiday.location);
  const subLocationSelected = useSelector((store: any) => store.Holiday.subLocation);
  const statusSelected = useSelector((store: any) => store.Holiday.status);
  const holidays = useSelector((store: any) => store.Holiday.data);
  const toggle = useSelector((store: any) => store.Holiday.toggle);
  const yearSelected = useSelector((state: any) => state.Holiday.years);
  const years = useSelector((state: any) =>state.Filters.years);

  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }

  const currentyear = (new Date().getFullYear());
  useEffect(()=>{
    dispatch(holidayActions.clearFilters());
    dispatch(holidayActions.changeStatus([{label:'Active', value:'Active'}]));
    dispatch(holidayActions.changeYears([{label:currentyear, value:currentyear}]));
  },[])

  const changeLocationSelectHandler = (event: any) => {
    dispatch(holidayActions.changeLocation(event));
  };
  const changeSubLocationSelectHandler = (event: any) => {
    dispatch(holidayActions.changeSubLocation(event));
  };
  const changeMarketSelectHandler = (event: any) => {
    dispatch(holidayActions.changeMarket(event));
  };
  const getHolidayDetails = async () => {
    const response = await fetch(`${GET_ALL_HOLIDAYS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, holidayDate : row.holidayDateString,updatedDate : row.updatedDate?.slice(0,10),createdDate:row.createdDate?.slice(0,10) }));
    dispatch(holidayActions.changeData(dataGet));
    dispatch(locationSublocationActions.changeData(dataGet));
    setTimeout(()=>setIsLoading(false), 2000);
  };
  useEffect(() => {
    getHolidayDetails();
  }, [toggle]);


  
  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
    dispatch(marketActions.changeData(dataGet));
  };
  const getLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_LOCATIONS}`);
    const dataGet = await response.json();
    // dispatch(locationSublocationActions.changeLocation(dataGet));
    dispatch(filterActions.changeLocations(dataGet));
    // dispatch(modalFilterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_SUB_LOCATIONS}`);
    const dataGet = await response.json();
    // dispatch(locationSublocationActions.changeSubLocation(dataGet));
    dispatch(filterActions.changeSubLocations(dataGet));
    // dispatch(modalFilterActions.changeSubLocations(dataGet));
  }
  useEffect(() => {
    getMarketDetails();
    getLocationDetails();
    getSubLocationDetails();
  }, []);

  const filteredHolidays = holidays.filter((holiday: any) => {
    const marketOptions = marketSelected.map((market: any) => market.value);
    const locationOptions = locationSelected.map((location: any) => location.value)
    const subLocationOptions = subLocationSelected.map((subLocation: any) => subLocation.value)
    const yearsOptions = yearSelected.map((years: any) => years.value)
console.log(yearsOptions, yearSelected)

    const statusOptions = statusSelected.map((status: any) => status.value);
    if ((!marketSelected.length) || (marketSelected.length > 0 && marketOptions.includes(holiday.marketName) == true)) {
      if ((!locationSelected.length) || (locationSelected.length > 0 && locationOptions.includes(holiday.locationName) == true))
        if ((!subLocationSelected.length) || (subLocationSelected.length > 0 && subLocationOptions.includes(holiday.subLocationName) == true))
          if ((!statusSelected.length ) || (statusSelected.length > 0 && statusOptions.includes(holiday.status)))
            if ((!yearSelected.length ) || (yearSelected.length > 0 && yearsOptions.includes(Number(holiday.holidayDateString.slice(-4)))))
            return true;
    }
    return false;
  });

  const handleRowDoubleClicked = (row: any) =>{
    setShowModal(true);
    setAction("Update");
    let data = {...row}
    setUpdateHolidayDetails(data);
  }

  //start constants for export
  const columnsAndSelectors=[
    {'name':'Occasion','selector':'occasionName','default':'true'},
    {'name':'Holiday Date','selector':'holidayDate','default':'true'},
    {'name':'Market','selector':'marketName','default':'true'},
    {'name':'Location','selector':'locationName','default':'true'},
    {'name':'Sub Location','selector':'subLocationName','default':'true'},
    {'name':'Status','selector':'status','default':'true'},
    {'name':'Created Date','selector':'createdDate','default':'true'},
    {'name':'Created By','selector':'createdBy','default':'true'},
    {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
    {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},
  ]
  const title = "Holiday Details";
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
            <h1 className="Heading-Cls">Holiday Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Holiday Details</span>
            </p>
            <div className="btns holiday" style={{marginLeft:"8px"}}>
             
              {/* <AddModal /> */}
              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateHolidayDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Market
              </label>
              <MultiSelect
                options={(marketList.filter((market:any) => market.status === "Active" ).map((market: any) => ({ label: market.marketName, value: market.marketName })))}
                value={marketSelected}
                onChange={changeMarketSelectHandler}
                labelledBy="Select Market"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Year
              </label>
              <MultiSelect
                options={years.map((year: any) => ({label:year, value: year }))}
                value={yearSelected}
                onChange={(event: any) => dispatch(holidayActions.changeYears(event))}
                labelledBy="Select Month"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Location
              </label>
              <MultiSelect
                options={locations.map((location: any) => ({ label: location.locationName, value: location.locationName }))}
                value={locationSelected}
                onChange={changeLocationSelectHandler}
                labelledBy="Select Location"
                valueRenderer={customValueRenderer}
              />
              
            </div>
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Sub Location
              </label>
              <MultiSelect
                options={locationSelected.length == 0 ? (subLocations.map((subLocation: any) => ({ label: subLocation.subLocationName, value: subLocation.subLocationName, locationName: subLocation.locationName }))) : ((subLocations.map((subLocation: any) => ({ label: subLocation.subLocationName, value: subLocation.subLocationName, locationName: subLocation.locationName }))).filter((subLocation: any) => locationSelected.map((location: any) => location.value).includes(subLocation.locationName)))}
                value={subLocationSelected}
                onChange={changeSubLocationSelectHandler}
                labelledBy="Select Sub Location"
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
                onChange={(event: any) => dispatch(holidayActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2 form-group" style={{ marginTop: "24px", marginLeft:'-3px', whiteSpace:'nowrap'  }}>
              <button type="button" className="btn btn-primary PAllocationFilters" onClick={() => dispatch(holidayActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>

          </div>
          {/* <DownloadBtn 
            columns={columns}
            filteredRecords={filteredHolidays}
            selectors={selectors}
            title={title}>
          </DownloadBtn> */}
        <div className="TableContentBorder" >
          <Table columnsAndSelectors={columnsAndSelectors} columns={columns} isLoading={isLoading} data={filteredHolidays} onRowDoubleClicked={handleRowDoubleClicked} id="data-table" title={title}/>
          </div>
        </div>
      </div>}
    </div>
  );
};

//Modal

const UpdateModal = (props: any) =>{
  console.log("Props: ", props);
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const [formValues, setFormValues] = useState(props.initialValues || {location:"0"});
  // console.log("Market Name: ", formValues.marketName);
  // const [occasion, setOccasion] = useState("");
  // const [subLocation, setSubLocation] = useState("0");
  // const [market, setMarket] = useState("0");
  // const [date, setDate] = useState<Date | null>(null);
  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);
  const marketList = useSelector((state: any) => state.Market.data);
  const [holidayDate, setHolidayDate] = useState<Date | null>(new Date(props.initialValues.holidayDate));
  const locationSelected = useSelector((store: any) => store.LocationSublocation.location);
  const subLocationSelected =  useSelector((store: any) => store.LocationSublocation.subLocation);
 
  let location = formValues.locationId;
  
  useEffect(()=>{
    // let xyz = locations.filter((l: any)=> l.locationId === formValues.locationId).map((l: any)=> l.locationName);
    // console.log("Locations: ", xyz[0]);
    dispatch(locationSublocationActions.changeLocation([{label:locations.filter((l: any)=> l.locationId === formValues.locationId).map((l: any)=> l.locationName)[0], value:formValues.locationId}]));
    dispatch(locationSublocationActions.changeSubLocation([{label:subLocations.filter((sl: any)=> sl.subLocationId === formValues.subLocationId).map((sl: any)=> sl.subLocationName)[0], locationId: subLocations.filter((sl: any)=> sl.subLocationId === formValues.subLocationId).map((sl: any)=> sl.locationId)[0], locationName: subLocations.filter((sl: any)=> sl.subLocationId === formValues.subLocationId).map((sl: any)=> sl.locationName)[0], value:formValues.subLocationId}]));
  },[]);

  const formSubmitHandler = async(event: any) => {
    event.preventDefault();
    let holidayStartDate: string | Date | null=null;
    console.log("Selected locations: ", locationSelected);
    console.log("Selected Sub Locations: ", subLocationSelected);
    if(holidayDate!=null){
      holidayStartDate= new Date(holidayDate);
      holidayStartDate.setDate(holidayStartDate.getDate());
      holidayStartDate = holidayStartDate.toLocaleDateString();
    }

    var px;
    let pl = subLocationSelected.map((sl: any)=> px = {
      occasionName: formValues.occasionName,
      locationId: sl.locationId,
      subLocationId: sl.value,
      marketId: formValues.marketId,
      holidayDate: holidayStartDate,
      status: formValues.status,
      updatedBy: username,
      createdBy: username,
    });
    let payload = {
      id: formValues.id,
      occasionName: formValues.occasionName,
      locationId: formValues.locationId,
      // Modifications required for location and sub location
      subLocationId: formValues.subLocationId,
      marketId: formValues.marketId,
      holidayDate: holidayStartDate,
      status: formValues.status,
      updatedBy: username,
      createdBy: username,
    };
    try {
      
      if(locationSelected.length == 0){
        const eContainer = document.getElementsByClassName('staticError');
        // for(let i=0; i < eContainer.length; i++){
          eContainer[0].textContent='Location can\'t be empty.';
        // }
      }
      if(subLocationSelected.length == 0){
        const eContainer = document.getElementsByClassName('staticError');
        // for(let i=0; i < eContainer.length; i++){
          eContainer[1].textContent='Sub Location can\'t be empty.';
        // }
      }
      if(validateForm('#UpdateHolidayForm')){
        const response = await fetch(`${BULK_POST_HOLIDAY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pl),
        });
        const dataResponse = await response.json();
        if (dataResponse.length) {
          if (dataResponse[0].statusCode == "201") {
            console.log(dataResponse[0].statusReason);
            console.log(dataResponse[0].recordsCreated);
            dispatch(holidayActions.changeToggle());
            props.closeModal();
            toast.success("Holiday Updated Successfully");
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");  
      }
    } catch {
      toast.error("Some Error occured.");
    }

  }

  const changeLocationSelectHandler = (event: any) => {
    dispatch(locationSublocationActions.changeLocation(event));
    };
  const changeSubLocationSelectHandler = (event: any) => {
    dispatch(locationSublocationActions.changeSubLocation(event));
  };

  const getHolidayDetails = async () => {
    const response = await fetch(`${GET_ALL_HOLIDAYS}`);
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, holidayDate : row.holidayDateString,updatedDate : row.updatedDate?.slice(0,10),createdDate:row.createdDate?.slice(0,10) }));
    dispatch(holidayActions.changeData(dataGet));
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
    const response = await fetch(`${DELETE_HOLIDAY}/${formValues.id}`);
    getHolidayDetails();
    props.closeModal();
  }
  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  
  const fakeOptions = [
    { label: "Select", value: "-10" },
    ];
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px", padding:"3px 6px 4px 6px", borderRadius:"4px" }}
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Update Holiday
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Holiday</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="UpdateHolidayForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="Occasion">
                <label className="form-label" htmlFor="holidayOccasion">
                  Occasion
                </label>
                <span className="requiredField">*</span>

                <input
                  required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  type="text"
                  className="form-control"
                  id="holidayOccasion"
                  name="occasionName"
                  value={formValues.occasionName}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('Occasion'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayDate">
                <label className="form-label" htmlFor="holidaydate" style={{ zIndex: "9" }}>
                  Holiday Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  required
                  className="form-control"
                  name="holidayDate"
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('HolidayDate'),'datePicker')}
                  onChange={setHolidayDate}
                  value={holidayDate}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayMarket">
                <label className="form-label" htmlFor="holidayMarket">
                  Market
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidayMarket"
                    name="marketId"
                    value={formValues.marketId}
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('HolidayMarket'),'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('HolidayMarket'),'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.id.toString()}>{market.marketName}</option>)}
                  </select>
                  <div className="error"></div>
                </div>
              </div>

              <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Location
              </label>
              <MultiSelect
                options={locations.map((location: any) => ({ label: location.locationName, value: location.locationId }))}
                value={locationSelected}
                onChange={changeLocationSelectHandler}
                labelledBy="Select Location"
                valueRenderer={customValueRenderer}
              />
              <div className="error staticError" style={{marginTop:"-4px"}}>

              </div>
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Sub Location
              </label>
              <MultiSelect
                disabled={locationSelected?.length == 0 ? true : false}
                options={locationSelected?.length == 0 ? fakeOptions : 
                  (
                    subLocations.map((subLocation: any) => ({
                      locationId: subLocation.locationId, 
                      label: subLocation.subLocationName, 
                      value: subLocation.subLocationId, 
                      locationName: subLocation.locationName 
                    })).filter((
                      subLocation: any) => 
                      locationSelected.some((location: any) => 
                      location?.value == subLocation.locationId )
                      ))
                    }
                value={subLocationSelected}
                onChange={changeSubLocationSelectHandler}
                labelledBy="Select Sub Location"
                valueRenderer={customValueRenderer}
              />
              
              <div className="error staticError" style={{marginTop:"-20px !important"}}>

              </div>
            </div>

              {/* <div className="col-md-6 form-group" id="HolidayLocation">
                <label className="form-label" htmlFor="holidayCountry">
                  Location
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidayCountry"
                    name="locationId"
                    value={formValues.locationId}
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('HolidayLocation'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('HolidayLocation'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {locations.map((location: any) => (<option key={location.locationId} value={location.locationId.toString()}> {location.locationName}</option>))}
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="isOffShore">
                <label className="form-label" htmlFor="holidaySubLocation">
                  Sub Location
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidaySubLocation"
                    value={formValues.subLocationId}
                    name="subLocationId"
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('isOffShore'), 'select')}
                    onChange={(e: any)=>{handleChange(e);
                      validateSingleFormGroup(document.getElementById('isOffShore'), 'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {location == "0" ? [] : (subLocations.filter((subLocation: any) => Number(location) == subLocation.locationId).map((subLocation: any) => (<option key={subLocation.subLocationId} value={subLocation.subLocationId.toString()}>{subLocation.subLocationName}</option>)))}
                  </select>
                  <div className="error"></div>
                </div>
              </div> */}
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

const AddModal = (props: any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const [occasion, setOccasion] = useState("");
  const [market, setMarket] = useState("0");
  const [date, setDate] = useState<Date | null>(null);
  const locations = useSelector((state: any) => state.ModalFilters.locations);
  const subLocations = useSelector((state: any) => state.ModalFilters.subLocations);
  const locationSelected = useSelector((store: any) => store.LocationSublocation.location);
  const subLocationSelected =  useSelector((store: any) => store.LocationSublocation.subLocation);
 

  const getLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(modalFilterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch(`${GET_ALL_SUB_LOCATIONS}`);
    const dataGet = await response.json();
    dispatch(modalFilterActions.changeSubLocations(dataGet));
  }

      // if(locationSelected.length <= 0){
      //   // getSubLocationDetails();
      //   dispatch(modalFilterActions.clearFilters());
      // }

  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
    const eContainer = document.getElementsByClassName('staticError');
    for(let i=0; i < eContainer.length; i++){
      eContainer[i].textContent='';
    }
    setOccasion("");
    dispatch(locationSublocationActions.clearFilters());
    setMarket("0");
    setDate(null);
  }
  const convertUTCDateToLocalDate = (date: Date) => {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    console.log("Sublocations: ",subLocationSelected)
    let holidayStartDate: string | Date | null=null;
    if(date!=null){
      holidayStartDate= new Date(date);
      holidayStartDate.setDate(holidayStartDate.getDate());
      holidayStartDate = holidayStartDate.toLocaleDateString();
    }
    var px;
    let pl = subLocationSelected.map((sl: any)=> px = {
      occasionName: occasion,
      locationId: sl.locationId,
      subLocationId: sl.value,
      marketId: market,
      holidayDate: holidayStartDate,
      createdBy: username,
    });
    // console.log("Pl is: ", pl);
    let payload = {
      occasionName: occasion,
      locationId: locationSelected,
      subLocationId: subLocationSelected,
      marketId: market,
      holidayDate: holidayStartDate,
      createdBy: username
    };
    try {
      if(locationSelected.length == 0){
        const eContainer = document.getElementsByClassName('staticError');
        // for(let i=0; i < eContainer.length; i++){
          eContainer[0].textContent='Location can\'t be empty.';
        // }
      }
      if(subLocationSelected.length == 0){
        const eContainer = document.getElementsByClassName('staticError');
        // for(let i=0; i < eContainer.length; i++){
          eContainer[1].textContent='Sub Location can\'t be empty.';
        // }
      }
      if(validateForm('#HolidayForm')){
        const response = await fetch(`${BULK_POST_HOLIDAY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pl),
        });
        const dataResponse = await response.json();
        console.log("Response: ", dataResponse);
        if (dataResponse.length) {
          if (dataResponse[0].statusCode == "201") {
            console.log(dataResponse[0].statusReason);
            console.log(dataResponse[0].recordsCreated);
  
            dispatch(holidayActions.changeToggle());
            resetFormFields();
            props.closeModal();
            toast.success("Holiday Added Successfully");
          } else toast.error(dataResponse[0].errorMessage);
          console.log("Error in try block: ", dataResponse);
        } else toast.error("Some Error occured.");  
      }
    } catch {
      toast.error("Some Error occured.");
    }
  };
  const marketList = useSelector((state: any) => state.Market.data);
  const getMarketDetails = async () => {
    const response = await fetch(`${GET_ALL_MARKETS}`);
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
    getLocationDetails();
    getSubLocationDetails();
    dispatch(locationSublocationActions.clearFilters());
  }, []);

  const changeLocationSelectHandler = (event: any) => {
    dispatch(locationSublocationActions.changeLocation(event));
    };
  const changeSubLocationSelectHandler = (event: any) => {
    dispatch(locationSublocationActions.changeSubLocation(event));
  };
  const fakeOptions = [
    { label: "Select", value: "-10" },
    ];

  
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px"}}
        
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Add Holiday
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New Holiday</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="HolidayForm" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="Occasion">
                <label className="form-label" htmlFor="holidayOccasion">
                  Occasion
                </label>
                <span className="requiredField">*</span>

                <input
                  required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  type="text"
                  className="form-control"
                  id="holidayOccasion"
                  value={occasion}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('Occasion'), 'input')}
                  onChange={(event: any) => setOccasion(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayDate">
                <label className="form-label" htmlFor="holidaydate" style={{ zIndex: "9" }}>
                  Holiday Date
                </label>
                <span className="requiredField">*</span>
                <DatePicker
                  required
                  className="form-control"
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('HolidayDate'),'datePicker')}
                  onChange={setDate}
                  value={date}
                  format="MM/dd/yyyy"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayMarket">
                <label className="form-label" htmlFor="holidayMarket">
                  Market
                </label>
                <span className="requiredField">*</span>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidayMarket"
                    value={market}
                    // onBlur = {()=>validateSingleFormGroup(document.getElementById('HolidayMarket'),'select')}
                    onChange={(event: any) => {setMarket(event.target.value);
                      validateSingleFormGroup(document.getElementById('HolidayMarket'),'select');
                    }}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.status == "Active").map((market: any) => <option key={market.id} value={market.id.toString()}>{market.marketName}</option>)}
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              
              <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Location
              </label>
              <MultiSelect
                options={locations.map((location: any) => ({ label: location.locationName, value: location.locationId }))}
                value={locationSelected}
                onChange={changeLocationSelectHandler}
                labelledBy="Select Location"
                valueRenderer={customValueRenderer}
              />
              <div className="error staticError" style={{marginTop:"-4px"}}></div>
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="" className="form-label">
                Sub Location
              </label>
              <MultiSelect
                disabled={locationSelected?.length == 0 ? true : false}
                options={locationSelected?.length == 0 ? 
                  fakeOptions : 
                  (
                    subLocations?.map((subLocation: any) => ({
                      locationId: subLocation.locationId, 
                      label: subLocation.subLocationName, 
                      value: subLocation.subLocationId, 
                      locationName: subLocation.locationName 
                    })).filter((
                      subLocation: any) => 
                      locationSelected.some((location: any) => 
                      location?.value == subLocation.locationId )
                      ))
                    }
                value={subLocationSelected}
                onChange={changeSubLocationSelectHandler}
                labelledBy="Select Sub Location"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="error staticError" style={{marginTop:"-20px !important"}} id="#sublocationError"></div>
                
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

export default HolidayMaster;
