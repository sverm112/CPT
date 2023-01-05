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

//Data Table
const columnsIndia = [
  {
    name: "Occasion",
    selector: (row: { title: any }) => row.title,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Date",
    selector: (row: { date: any }) => row.date,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { market: any }) => row.market,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Haryana",
    selector: (row: { LocationHR: any }) => row.LocationHR,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Uttar Pradesh",
    selector: (row: { LocationUP: any }) => row.LocationUP,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Telangana",
    selector: (row: { LocationTLGN: any }) => row.LocationTLGN,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Karnataka",
    selector: (row: { LocationKRN: any }) => row.LocationKRN,
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

const columnsUS = [
  {
    name: "Occasion",
    selector: (row: { title: any }) => row.title,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Date",
    selector: (row: { date: any }) => row.date,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { market: any }) => row.market,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Washington",
    selector: (row: { LocationWashington: any }) => row.LocationWashington,
    sortable: true,
    reorder: true,
    filterable: true,
  },
];

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
  const countrySelected= useSelector((store: any) => store.Holiday.location);
  const marketSelected= useSelector((store: any) => store.Holiday.market);
  const year= useSelector((store: any) => store.Holiday.year);
  const dataUS = useSelector((store: any) => store.Holiday.dataUS);
  const toggleUS = useSelector((store: any) => store.Holiday.toggleUS);
  const dataIndia = useSelector((store: any) => store.Holiday.dataIndia);
  const toggleIndia = useSelector((store: any) => store.Holiday.toggleIndia);



  const changeCountrySelectHandler = (event: any) => {
    dispatch(holidayActions.changeLocation(event.target.value));
  };
  const changeYearSelectHandler = (event: any) => {
    dispatch(holidayActions.changeYear(event.target.value));
  };
  const changeMarketSelectHandler = (event: any) => {
    dispatch(holidayActions.changeMarket(event));
  };

  
  
  const getHolidayDetailsUS = async () => {
    const response = await fetch("https://localhost:44314/api/holiday/US");
    const data = await response.json();
    console.log(data);
    dispatch(holidayActions.changeDataUS(data));
  };
  

  const getHolidayDetailsIndia = async () => {
    const response = await fetch("https://localhost:44314/api/holiday/India");
    const data = await response.json();
    console.log(data);
    dispatch(holidayActions.changeDataIndia(data));
  };
  useEffect(() => {
    getHolidayDetailsIndia();
  }, [toggleIndia]);
  useEffect(() => {
    getHolidayDetailsUS();
  }, [toggleUS]);

  let holidays = null;
  let columns = null;
  if (countrySelected == "2" || countrySelected == "0") {
    holidays = dataIndia;
    columns = columnsIndia;
  } else if (countrySelected == "1") {
    holidays = dataUS;
    columns = columnsUS;
  }
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
                options={markets}
                value={marketSelected}
                onChange={changeMarketSelectHandler}
                labelledBy="Select Market"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className=" col-md-2 form-group">
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
            </div>
            <div className=" col-md-2 form-group">
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
                  {/* <option value="15">2009</option>
                  <option value="16">2008</option>
                  <option value="17">2007</option>
                  <option value="18">2006</option>
                  <option value="19">2005</option>
                  <option value="19">2004</option>
                  <option value="20">2003</option>
                  <option value="21">2002</option>
                  <option value="22">2001</option>
                  <option value="23">2000</option> */}
                </select>
              </div>
            </div>
          </div>
          {/*commented for now
                    <MultiSelect
                        options={countries}
                        value={countrySelected}
                        onChange={setCountrySelected}
                        labelledBy="Select"
                    />
                    */}
          <Table columns={columns} data={holidays} />
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
  let values = null;
  let options = null;

  if (location == "1" || location == "0") {
    values = USSubLocations;
  } else if (location == "2") {
    values = IndiaSubLocations;
  }

  if (values) {
    options = values.map((el) => <option key={el}>{el}</option>);
  }

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let data = {
      occasion: occasion,
      location: location,
      subLocation: subLocation,
      market: market,
      date: date,
    };
    try {
      const response = await fetch("https://localhost:44314/api/holiday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (location == "1") dispatch(holidayActions.changeToggleUS());
      else dispatch(holidayActions.changeToggleIndia());
    } catch {
      console.log("Hi");
    }
  };

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
                  Sub-Location
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
                    <option value="AppleCare">AppleCare</option>
                    <option value="Beaver">Beaver</option>
                    <option value="CA">CA</option>
                    <option value="HCP">HCP</option>
                    <option value="Monarch">Monarch</option>
                    <option value="NAMM">NAMM</option>
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
