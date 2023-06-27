import { useState, useEffect } from "react";
import SideBar from "../../SideBar/SideBar";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Table from "../../DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { marketActions } from "../../Store/Slices/Market";
import { toast } from "react-toastify";
import { validateForm, validateSingleFormGroup } from "../../utils/validations";
import { PatternsAndMessages } from "../../utils/ValidationPatternAndMessage";
import { DELETE_MARKET, GET_ALL_MARKETS, POST_MARKET, UPDATE_MARKET } from "../../constants";
import { RotatingLines } from "react-loader-spinner";
import { closeNav } from "../../SideBar/SideBarJs";
import { MultiSelect } from "react-multi-select-component";

const columns = [
  {
    name: "Market Name",
    selector: (row: { marketName: any }) => row.marketName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market Domain",
    selector: (row: { marketDomain: any }) => row.marketDomain,
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

const Market = () => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const [isLoading, setIsLoading] = useState(true);
  const markets = useSelector((store: any) => store.Market.data);
  const toggle = useSelector((store: any) => store.Market.toggle);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [updateMarketDetails, setUpdateMarketDetails] = useState({});
  const status = useSelector((state: any) => state.Filters.status);
  const statusSelected = useSelector((store: any) => store.Market.status);
  
  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
    setAction("Add");
  }
  const getMarketDetails = async () => {
    try {
      const response = await fetch(`${GET_ALL_MARKETS}`);
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
      dispatch(marketActions.changeData(dataGet));
      setTimeout(()=>setIsLoading(false), 2000);
    }
    catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getMarketDetails();
  }, [toggle]);
  //start constants for export
  const title = "Market Details";
  const columnsAndSelectors=[
    {'name' :'Market Name','selector':'marketName','default':'true'},
  {'name' :'Market Domain','selector':'marketDomain','default':'true'},
  {'name' :'Status','selector':'status','default':'true'},
  {'name' :'Created Date','selector':'createdDate','default':'true'},
  {'name' :'Created By','selector':'createdBy','default':'true'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},];
  //end constants for export
 let filteredColumns=columns;
 const handleRowDoubleClicked = (row: any) => {
    console.log(row);
    setShowModal(true);
    setAction("Update");
    let data = { ...row}
    console.log(data);
    setUpdateMarketDetails(data);
  };

  const filteredMarkets = markets.filter((market: any) =>{
    const statusOptions = statusSelected.map((status: any) => status.value);
    if ((!statusSelected.length ) || (statusSelected.length > 0 && statusOptions.includes(market.status))) {
        return true;
    }
  })

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
            <h1 className="Heading-Cls">Market Details</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Market</span>
            </p>
            <div className="btns market">
              {/* <button type="button" className="btn btn-primary upload-button-btn" >
                <i className="las la-file-upload"></i>
              </button> */}
              {/* <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                
              /> */}
              {action == "Add" && <AddModal showModal={showModal} openModal={openModal} closeModal={closeModal} />}
              {action == "Update" && <UpdateModal initialValues={updateMarketDetails} showModal={showModal} openModal={openModal} closeModal={closeModal} />}
            </div>
          </div>
          <div className="row filter-row">
            <div className=" col-md-2 form-group">
              <label htmlFor="activeDropdown" className="form-label">
                Status
              </label>
              <MultiSelect
                options={status.map((status: any) => ({ label: status, value: status }))}
                value={statusSelected}
                onChange={(event: any) => dispatch(marketActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div>
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(marketActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table  columnsAndSelectors={columnsAndSelectors} isLoading={isLoading} columns={columns} data={filteredMarkets} onRowDoubleClicked={handleRowDoubleClicked} customValueRenderer={customValueRenderer} title={title}/>
          </div>
        </div>
      </div>}
    </div>
  );
};

const AddModal = (props : any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const [marketName, setMarketName] = useState("");
  const [marketDomain, setMarketDomain] = useState("");
  const resetFormFields = () => {
    const errorContainer = document.getElementsByClassName('error');
    for(let i=0; i < errorContainer.length; i++){
      errorContainer[i].textContent='';
    }
    setMarketName("");
    setMarketDomain("");
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      marketName: marketName,
      marketDomain: marketDomain,
      createdBy: username
    };
    try {
      if(validateForm('#AddMarket')){
        const response = await fetch(`${POST_MARKET}`, {
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
  
            dispatch(marketActions.changeToggle());
            resetFormFields();
            props.closeModal();
            toast.success("Market Added Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
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
        <i className="las la-plus"></i> Add Market
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Add New Market</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="AddMarket" noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="MarketNameField">
                <label className="form-label" htmlFor="marketName">
                  Market Name
                </label>
                <span className="requiredField">*</span>
                <input
                  required                  
                  type="text"
                  className="form-control"
                  id="marketName"
                  value={marketName}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketNameField'),'input')}
                  onChange={(event: any) => setMarketName(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="MarketDomainField">
                <label className="form-label" htmlFor="marketDomain">
                  Market Domain
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="marketDomain"
                  value={marketDomain}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketDomainField'), 'input')}
                  onChange={(event: any) => setMarketDomain(event.target.value)}
                />
                <div className="error"></div>
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

const UpdateModal = (props: any) => {
  const dispatch = useDispatch();
  const username=useSelector((state:any)=>state.User.username);
  const [formValues, setFormValues] = useState(props.initialValues || {});
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
      id: formValues.id,
      marketName : formValues.marketName,
      marketDomain : formValues.marketDomain,
      status: formValues.status,
      updatedBy: username,
    };
    try {
      if(validateForm('#UpdateMarketForm')){
        const response = await fetch(`${UPDATE_MARKET}`, {
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
            dispatch(marketActions.changeToggle());
            props.closeModal();
            toast.success("Market Updated Successfully")
          } else toast.error(dataResponse[0].errorMessage);
        } else toast.error("Some Error occured.");
      }
    } catch {
      toast.error("Some Error occured.");
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

  const getMarketDetails = async () => {
    try {
      const response = await fetch(`${GET_ALL_MARKETS}`);
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row,createdDate:row.createdDateString,updatedDate:row.updatedDateString}));
      dispatch(marketActions.changeData(dataGet));
    }
    catch {
      console.log("Error occured");
    }
  };
  const handleDelete = async()=>{
    // id: formValues.id,
    const response = await fetch(`${DELETE_MARKET}/${formValues.id}`);
    getMarketDetails();
    props.closeModal();
  }
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
        style={{ float: "right", marginTop: "-68px"}}
        
        variant="primary"
        onClick={props.openModal}
      >
        <i className="las la-plus"></i> Update Market
      </Button>
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton onClick={props.closeModal}>
          <Modal.Title>
            <h6>Update Market</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler} id="UpdateMarketForm"  noValidate>
            <div className="row">
              <div className="col-md-6 form-group" id="MarketNameUpdateField">
                <label className="form-label" htmlFor="marketName">
                  Market Name
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  name="marketName"
                  className="form-control"
                  id="marketName"
                  value={formValues.marketName}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('MarketNameUpdateField'), 'input')}
                  onChange={handleChange}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="MarketUpdateField">
                <label className="form-label" htmlFor="marketDomain">
                  Market Domain
                </label>
                <span className="requiredField">*</span>
                <input
                  required
                  type="text"
                  name="marketDomain"
                  className="form-control"
                  id="marketDomain"
                  value={formValues.marketDomain}
                  onBlur={()=>validateSingleFormGroup(document.getElementById('MarketUpdateField'),'input')}
                  onChange={handleChange}
                />                
                <div className="error"></div>
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
                    <option value="Closed">Closed</option>
                    <option value="InActive">InActive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
              {/* handleDelete */}
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


export default Market;
