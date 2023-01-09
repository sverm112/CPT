import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../../SideBar/SideBar";
// import ModalDialog from '../../modal/modal';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { MultiSelect } from "react-multi-select-component";
import Table from "../../DataTable/DataTable";
import { holidayActions } from "../../Store/Slices/Holiday";
import { useDispatch, useSelector } from "react-redux";
import { marketActions } from "../../Store/Slices/Market";

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
    selector: (row: { holidayDate: any }) => row.holidayDate.slice(0,10),
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
    name: "Market",
    selector: (row: { marketName: any }) => row.marketName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Status",
    selector: (row: { isActive: any }) => row.isActive == "1" ? "Active" : "InActive",
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

// const dataIndia = [
//   {
//     id: 1,
//     title: "Republic Day",
//     date: "26/01/2022",
//     market: "CA",
//     LocationHR: "✔",
//     LocationUP: "✔",
//     LocationTLGN: "✔",
//     LocationKRN: "✔",
//   },
//   {
//     id: 2,
//     title: "May Day",
//     date: "01/05/2022",
//     market: "CA",
//     LocationHR: "✖",
//     LocationUP: "✖",
//     LocationTLGN: "✔",
//     LocationKRN: "✔",
//   },
//   {
//     id: 3,
//     title: "Independence Day",
//     date: "15/08/2022",
//     market: "CA",
//     LocationHR: "✔",
//     LocationUP: "✔",
//     LocationTLGN: "✔",
//     LocationKRN: "✔",
//   },
//   {
//     id: 4,
//     title: "Gandhi Jayanti",
//     date: "02/10/2022",
//     market: "CA",
//     LocationHR: "✔",
//     LocationUP: "✔",
//     LocationTLGN: "✔",
//     LocationKRN: "✔",
//   },
//   {
//     id: 5,
//     title: "Guru Nanak Jayanti",
//     date: "08/11/2022",
//     market: "CA",
//     LocationHR: "✔",
//     LocationUP: "✔",
//     LocationTLGN: "✖",
//     LocationKRN: "✖",
//   },
// ];

// const columnsUS = [
//   {
//     name: "Occasion",
//     selector: (row: { title: any }) => row.title,
//     sortable: true,
//     reorder: true,
//     filterable: true,
//   },
//   {
//     name: "Date",
//     selector: (row: { date: any }) => row.date,
//     sortable: true,
//     reorder: true,
//     filterable: true,
//   },
//   {
//     name: "Market",
//     selector: (row: { market: any }) => row.market,
//     sortable: true,
//     reorder: true,
//     filterable: true,
//   },
//   {
//     name: "Washington",
//     selector: (row: { LocationWashington: any }) => row.LocationWashington,
//     sortable: true,
//     reorder: true,
//     filterable: true,
//   },
// ];

// const dataUS = [
//   {
//     id: 1,
//     title: "New Yera's Day",
//     date: "01/01/2022",
//     market: "CA",
//     LocationWashington: "✖",
//   },
//   {
//     id: 2,
//     title: "Independence Day",
//     date: "04/07/2022",
//     market: "CA",
//     LocationWashington: "✔",
//   },
//   {
//     id: 3,
//     title: "Veterans Day",
//     date: "11/11/2022",
//     market: "CA",
//     LocationWashington: "✔",
//   },
//   {
//     id: 4,
//     title: "Human Rights Day",
//     date: "10/12/2022",
//     market: "CA",
//     LocationWashington: "✖",
//   },
//   {
//     id: 5,
//     title: "Christmas Day",
//     date: "25/12/2022",
//     market: "CA",
//     LocationWashington: "✔",
//   },
// ];
const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};

const HolidayMaster = () => {
  const markets = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];
  const countries = [
    { label: "US", value: "US" },
    { label: "India", value: "India" },
  ];
  const USSubLocations = [{ label: "Washington", value: "Washington" }];
  const IndiaSubLocations = [
    { label: "Haryana", value: "Haryana" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Karnataka", value: "Karnataka" },
  ];
  const dispatch = useDispatch();
  // const countrySelected= useSelector((store: any) => store.Holiday.location);
  const marketSelected= useSelector((store: any) => store.Holiday.market);
  // const year= useSelector((store: any) => store.Holiday.year);
  const holidays = useSelector((store: any) => store.Holiday.data);
  const toggle = useSelector((store: any) => store.Holiday.toggle);
  // const dataIndia = useSelector((store: any) => store.Holiday.dataIndia);
  // const toggleIndia = useSelector((store: any) => store.Holiday.toggleIndia);



  // const changeCountrySelectHandler = (event: any) => {
  //   dispatch(holidayActions.changeLocation(event.target.value));
  // };
  // const changeYearSelectHandler = (event: any) => {
  //   dispatch(holidayActions.changeYear(event.target.value));
  // };
  const changeMarketSelectHandler = (event: any) => {
    dispatch(holidayActions.changeMarket(event));
  };

  
  
  const getHolidayDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/HolidaysList/GetAllHolidaysLists");
    const data = await response.json();
    console.log(data);
    dispatch(holidayActions.changeData(data));
  };
  

  // const getHolidayDetailsIndia = async () => {
  //   const response = await fetch("https://localhost:44314/api/holiday/India");
  //   const data = await response.json();
  //   console.log(data);
  //   dispatch(holidayActions.changeDataIndia(data));
  // };
  // useEffect(() => {
  //   getHolidayDetailsIndia();
  // }, [toggleIndia]);
  useEffect(() => {
    getHolidayDetails();
  }, [toggle]);

  // let holidays = null;
  // let columns = null;
  // if (countrySelected == "2" || countrySelected == "0") {
  //   holidays = dataIndia;
  //   columns = columnsIndia;
  // } else if (countrySelected == "1") {
  //   holidays = dataUS;
  //   columns = columnsUS;
  //}
  const marketList=useSelector((state: any) => state.Market.data);
  const getMarketDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Markets/GetAllMarkets");
    const dataGet = await response.json();
    console.log(dataGet);
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, []);

  const filteredHolidays = holidays.filter((holiday: any)=>{
    const marketOptions=marketSelected.map((market: any)=>market.value);
    if((!marketSelected.length) ||(marketSelected.length>0 && marketOptions.includes(holiday.marketName)==true))
    {
      return true;
    }
    return false;
  })
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
                options={(marketList.map((market:any)=>({label : market.marketName, value : market.marketName})))}
                value={marketSelected}
                onChange={changeMarketSelectHandler}
                labelledBy="Select Market"
                valueRenderer={customValueRenderer}
              />
             </div>
             {/*<div className=" col-md-2 form-group">
              <label htmlFor="countrydropdown" className="form-label">
                Location
              </label>
              <div className="dropdown">
                <select className="form-control " id="countrydropdown" value={countrySelected}onChange={changeCountrySelectHandler}>
                  <option value="0">Select</option>
                  <option value="1">US</option>
                  <option value="2">India</option>
                </select>
              </div>
            </div> */}
            {/*<div className=" col-md-2 form-group">
              <label htmlFor="locationdropdown" className="form-label">
                Year
              </label>
              <div className="dropdown">
                <select className="form-control " id="yeardropdown" value={year}onChange={changeYearSelectHandler}>
                  <option value="0">Select</option>
                  <option value="1">2022</option>
                  <option value="3">2021</option>
                  <option value="4">2020</option>
                  <option value="5">2019</option>
                  <option value="6">2018</option>
                  <option value="7">2017</option>
                  <option value="8">2016</option>
                  <option value="9">2015</option>
                  <option value="10">2014</option>
                  <option value="11">2013</option>
                  <option value="12">2012</option>
                  <option value="13">2011</option>
                  <option value="14">2010</option>
                   <option value="15">2009</option>
                  <option value="16">2008</option>
                  <option value="17">2007</option>
                  <option value="18">2006</option>
                  <option value="19">2005</option>
                  <option value="19">2004</option>
                  <option value="20">2003</option>
                  <option value="21">2002</option>
                  <option value="22">2001</option>
                  <option value="23">2000</option> 
                </select>
              </div>
            </div> */}
          </div>
          {/*commented for now
                    <MultiSelect
                        options={countries}
                        value={countrySelected}
                        onChange={setCountrySelected}
                        labelledBy="Select"
                    />
                    */}
          <Table columns={columns} data={filteredHolidays} />
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    return invokeModal(false);
  }
  const [occasion, setOccasion] = useState("");
  const [location, setLocation] = useState("0");
  const [subLocation, setSubLocation] = useState("0");
  const [market, setMarket] = useState("0");
  const [date, setDate] = useState(new Date());
  const [countrySelected, setCountrySelected] = React.useState("");

  const USSubLocations = ["Washington"];
  const IndiaSubLocations = ["Haryana", "Uttar Pradesh", "Hyderabad", "Karnataka"];

  const USOptions=[<option value="5">Washington</option>]
  const IndiaOptions =[<option value="6">Haryana</option>,<option value="3">Uttar Pradesh</option>,<option value="4">Hyderabad</option>,<option value="8">Karnataka</option>]
  let values = null;
  let options = null;

  if (location == "1" || location == "0") {
    options = USOptions;
  } else if (location == "2") {
    options = IndiaOptions;
  }
  
  // if (values) {
  //   options = values.map((el) => <option key={el}>{el}</option>);
  // }
  const resetFormFields=()=>{
    setOccasion("");
    setLocation("0");
    setSubLocation("0");
    setMarket("0");
    setDate(new Date());
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      occasionName: occasion,
     fkLocationID: location,
      fkSubLocationID: subLocation,
      fkMarketID : market,
      HolidayDate: date,
      createdBy : "Admin"
    };
    try {
      const response = await fetch("https://localhost:44314/api/v1/HolidaysList/PostHoliday", {
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
        } else console.log(dataResponse[0].errorMessage);
      } else console.log("Bad response");
    } catch {
      console.log("Error occured while uploading data");
    }
  };
  const marketList=useSelector((state: any) => state.Market.data);
  const getMarketDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Markets/GetAllMarkets");
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
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New Holiday</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form className="form-capsule">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label className="form-label" htmlFor="holidayOccasion">Occasion</label>
                                <i className="las la-calendar-plus"></i>
                                <input type="text" className="form-control" id="holidayOccasion" placeholder="Occasion" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label className="form-label" htmlFor="holidayCategory">Category</label>
                                <i className="lar la-calendar"></i>
                                <select className="form-control" id="holidayCategory">
                                    <option value="0">Select</option>
                                    <option value="1">On Shore</option>
                                    <option value="2">Off Shore</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group showoffshore" id="isOffShore">
                                <label className="form-label" htmlFor="holidayState">Location</label>
                                <i className="lar la-calendar"></i>
                                <select className="form-control" id="holidayState">
                                    <option value="0">Select</option>
                                    <option value="1">Haryana</option>
                                    <option value="2">Karnataka</option>
                                    <option value="3">Telangana</option>
                                    <option value="4">Uttar Pradesh</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label className="form-label" htmlFor="holidaydate" style={{zIndex:"9"}}>Date</label>
                                <i className="lar la-calendar" style={{zIndex:"9"}}></i>
                                <DatePicker className="form-control" onChange={onChange} value={value} format="dd/MM/yyyy" dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary" style={{ float: "right" }} >Submit</button>
                            </div>
                        </div>
                    </form> */}
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="holidayOccasion">
                  Occasion
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="holidayOccasion"
                  value={occasion}
                  onChange={(event: any) => setOccasion(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="holidayCountry">
                  Location
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="holidayCountry"
                    value={location}
                    onChange={(event: any) => setLocation(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="1">US</option>
                    <option value="2">India</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group" id="isOffShore">
                <label className="form-label" htmlFor="holidaySubLocation">
                  Sub Location
                </label>
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
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="holidayMarket">
                  Market
                </label>
                <div className="dropdown">
                  <select
                    className="form-control"
                    id="holidayMarket"
                    value={market}
                    onChange={(event: any) => setMarket(event.target.value)}
                  >
                    <option value="0">Select</option>
                    {marketList.map((market:any)=><option key={market.pkMarketID} value={market.pkMarketID.toString()}>{market.marketName}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="holidaydate" style={{ zIndex: "9" }}>
                  Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setDate}
                  value={date}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
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
        {/* <Modal.Footer>
                    <Button variant="danger" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default HolidayMaster;
