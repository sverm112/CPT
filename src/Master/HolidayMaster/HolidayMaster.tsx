import React, { useState, useEffect } from "react";
import SideBar from "../../SideBar/SideBar";
// import ModalDialog from '../../modal/modal';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Tab } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { MultiSelect } from "react-multi-select-component";
import Table from "../../DataTable/DataTable";
import { holidayActions } from "../../Store/Slices/Holiday";
import { useDispatch, useSelector } from "react-redux";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import { filterActions } from "../../Store/Slices/Filters";
import DownloadBtn from "../../Export/DownloadBtn"; 
import { PatternsAndMessages } from "../../utils/ValidationPatternAndMessage";
import { validateSingleFormGroup } from "../../utils/validations";

//Data Table
const columns = [
  // {
  //   name: "Id",
  //   selector: (row: { pkHolidayID: any }) => row.pkHolidayID,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  {
    name: "Occasion",
    selector: (row: { occasionName: any }) => row.occasionName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Holiday Date",
    selector: (row: { holidayDate: any }) => row.holidayDate.slice(0, 10),
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { marketName: any }) => row.marketName == "0" ? "" : row.marketName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Location",
    selector: (row: { locationName: any }) => row.locationName == "0" ? "" : row.locationName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Sub Location",
    selector: (row: { subLocationName: any }) => row.subLocationName == "0" ? "" : row.subLocationName,
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
  {'name':'Occasion','selector':'occasionName','default':'true'},
  {'name':'Holiday Date','selector':'holidayDate','default':'true'},
  {'name':'Market','selector':'marketName','default':'true'},
  {'name':'Location','selector':'locationName','default':'true'},
  {'name':'Sub Location','selector':'subLocationName','default':'true'},
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

const HolidayMaster = () => {


  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);
  const status = useSelector((state: any) => state.Filters.status);
  const dispatch = useDispatch();
  const marketSelected = useSelector((store: any) => store.Holiday.market);
  const locationSelected = useSelector((store: any) => store.Holiday.location);
  const subLocationSelected = useSelector((store: any) => store.Holiday.subLocation);
  const statusSelected = useSelector((store: any) => store.Holiday.status);
  const holidays = useSelector((store: any) => store.Holiday.data);
  const toggle = useSelector((store: any) => store.Holiday.toggle);
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
    const response = await fetch("http://10.147.172.18:9190/api/v1/HolidaysList/GetAllHolidaysLists");
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
    dispatch(holidayActions.changeData(dataGet));
  };
  useEffect(() => {
    getHolidayDetails();
  }, [toggle]);


  const marketList = useSelector((state: any) => state.Market.data);
  const getMarketDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets");
    let dataGet = await response.json();
    dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  const getLocationDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/Location/GetAllLocations");
    const dataGet = await response.json();
    dispatch(filterActions.changeLocations(dataGet));
  }
  const getSubLocationDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/SubLocation/GetAllSubLocations");
    const dataGet = await response.json();
    dispatch(filterActions.changeSubLocations(dataGet));
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
    const statusOptions = statusSelected.map((status: any) => status.value);
    if ((!marketSelected.length) || (marketSelected.length > 0 && marketOptions.includes(holiday.marketName) == true)) {
      if ((!locationSelected.length) || (locationSelected.length > 0 && locationOptions.includes(holiday.locationName) == true))
        if ((!subLocationSelected.length) || (subLocationSelected.length > 0 && subLocationOptions.includes(holiday.subLocationName) == true))
          if ((!statusSelected.length) || (statusSelected.length > 0 && statusOptions.includes(holiday.isActive)))
            return true;
    }
    return false;
  });

  //start constants for export
  const selectors = ['occasionName', 'holidayDate', 'marketName', 'locationName', 'subLocationName', 'isActive', 'createdDate', 'createdBy']
  const title = "Holiday Details";
  //end constants for export

  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Holiday Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Holiday Details</span>
            </p>
            <div className="btns holiday">
              {/* <button type="button" className="btn btn-primary upload-button-btn" style={{ marginRight: "150px" }}>
                <i className="las la-file-upload"></i>
              </button> */}
              {/* <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ marginRight: "150px" }}
              /> */}
              <ModalDialog />
            </div>
          </div>
          <div className="row filter-row">
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
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(holidayActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>

          </div>
          {/* <DownloadBtn 
            columns={columns}
            filteredRecords={filteredHolidays}
            selectors={selectors}
            title={title}>
          </DownloadBtn> */}
        <div className="TableContentBorder" >
          <Table columnsAndSelectors={columnsAndSelectors} columns={columns} data={filteredHolidays} id="data-table" title={title}/>
          </div>
        </div>
      </div>
    </div>
  );
};

//Modal
const ModalDialog = () => {
  const dispatch = useDispatch();
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  function closeModal() {
    return invokeModal(false);
  }
  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("0");
  const [subLocation, setSubLocation] = useState("0");
  const [market, setMarket] = useState("0");
  const [date, setDate] = useState<Date | null>(null);
  const locations = useSelector((state: any) => state.Filters.locations);
  const subLocations = useSelector((state: any) => state.Filters.subLocations);

  const resetFormFields = () => {
    setOccasion("");
    setLocation("0");
    setSubLocation("0");
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
    let payload = {
      occasionName: occasion,
      fkLocationID: location,
      fkSubLocationID: subLocation,
      fkMarketID: market,
      HolidayDate: date,
      createdBy: "Admin"
    };
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/HolidaysList/PostHoliday", {
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

          dispatch(holidayActions.changeToggle());
          resetFormFields();
          closeModal();
          toast.success("Holiday Added Successfully");
        } else toast.error(dataResponse[0].errorMessage);
      } else toast.error("Some Error occured.");
    } catch {
      toast.error("Some Error occured.");
    }
  };
  const marketList = useSelector((state: any) => state.Market.data);
  const getMarketDetails = async () => {
    const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets");
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-68px" }}
        variant="primary"
        onClick={initModal}
      >
        <i className="las la-plus"></i> Add Holiday
      </Button>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New Holiday</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group" id="Occasion">
                <label className="form-label" htmlFor="holidayOccasion">
                  Occasion
                </label>
                <input
                  required
                  pattern={PatternsAndMessages.nameLike.pattern}
                  type="text"
                  className="form-control"
                  id="holidayOccasion"
                  value={occasion}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('Occasion'))}
                  onChange={(event: any) => setOccasion(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayDate">
                <label className="form-label" htmlFor="holidaydate" style={{ zIndex: "9" }}>
                  Holiday Date
                </label>
                <DatePicker
                  required
                  className="form-control"
                  onCalendarClose = {()=>validateSingleFormGroup(document.getElementById('HolidayDate'))}
                  onChange={setDate}
                  value={date}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="HolidayMarket">
                <label className="form-label" htmlFor="holidayMarket">
                  Market
                </label>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidayMarket"
                    value={market}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('HolidayMarket'))}
                    onChange={(event: any) => setMarket(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {marketList.filter((market: any) => market.isActive == "Active").map((market: any) => <option key={market.pkMarketID} value={market.pkMarketID.toString()}>{market.marketName}</option>)}
                  </select>
                  <div className="error"></div>
                </div>
              </div>
              <div className="col-md-6 form-group" id="HolidayLocation">
                <label className="form-label" htmlFor="holidayCountry">
                  Location
                </label>
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidayCountry"
                    value={location}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('HolidayLocation'))}
                    onChange={(event: any) => setLocation(event.target.value)}
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
                <div className="dropdown">
                  <select
                    required
                    className="form-control"
                    id="holidaySubLocation"
                    value={subLocation}
                    onBlur = {()=>validateSingleFormGroup(document.getElementById('isOffShore'))}
                    onChange={(event: any) => setSubLocation(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {location == "0" ? [] : (subLocations.filter((subLocation: any) => Number(location) == subLocation.locationId).map((subLocation: any) => (<option key={subLocation.subLocationId} value={subLocation.subLocationId.toString()}>{subLocation.subLocationName}</option>)))}
                  </select>
                  <div className="error"></div>
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

export default HolidayMaster;
