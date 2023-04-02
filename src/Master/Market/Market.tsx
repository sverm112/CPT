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

const columns = [
  // {
  //   name: "Market Id",
  //   selector: (row: { pkMarketID: any }) => row.pkMarketID,

  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
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

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};

const Market = () => {
  const marketNames = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];
  const dispatch = useDispatch();
  const markets = useSelector((store: any) => store.Market.data);
  
  //const marketNameSelected = useSelector((store: any) => store.Market.marketName);
  const toggle = useSelector((store: any) => store.Market.toggle);

  const getMarketDetails = async () => {
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/GetAllMarkets");
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
      dispatch(marketActions.changeData(dataGet));
    }
    catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getMarketDetails();
  }, [toggle]);

  //start constants for export
  const selectors = ['marketName', 'marketDomain', 'isActive', 'createdDate', 'createdBy']
  const title = "Market Details";

  const columnsAndSelectors=[
    {'name' :'Market Name','selector':'marketName','default':'true'},
  {'name' :'Market Domain','selector':'marketDomain','default':'true'},
  {'name' :'Status','selector':'isActive','default':'true'},
  {'name' :'Created Date','selector':'createdDate','default':'true'},
  {'name' :'Created By','selector':'createdBy','default':'true'},
  {'name': 'Updated Date', 'selector' : 'updatedDate','default':'false'},
  {'name': 'Updated By', 'selector' : 'updatedBy','default':'false'},];
  //end constants for export
 let filteredColumns=columns;
  

  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
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
              <ModalDialog />
            </div>
          </div>
          {/* <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Columns
              </label>
              <MultiSelect
                options={columns.map((column:any)=>({label : column['name'],value:column['name']}))}
                value={columnsSelected}
                onChange={(event: any) => dispatch(marketActions.changeColumns(event))}
                labelledBy="Select Market Code"
                valueRenderer={customValueRenderer}
              />
            </div>
          </div> */}
          {/* <DownloadBtn 
            columns={columns}
            filteredRecords={markets}
            selectors={selectors}
            title={title}>
          </DownloadBtn> */}
          <div className="TableContentBorder">
            <Table  columnsAndSelectors={columnsAndSelectors}columns={filteredColumns} data={markets} customValueRenderer={customValueRenderer} title={title}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalDialog = () => {
  const dispatch = useDispatch();
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };

  function closeModal() {
    return invokeModal(false);
  }
  const [marketName, setMarketName] = useState("");
  const [marketDomain, setMarketDomain] = useState("");
  const resetFormFields = () => {
    setMarketName("");
    setMarketDomain("");
  }
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    validateForm('#AddMarket');
    let payload = {
      marketName: marketName,
      marketDomain: marketDomain,
      createdBy: "Admin"
    };
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/Markets/PostMarket", {
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
          closeModal();
          toast.success("Market Added Successfully")
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
        onClick={initModal}
      >
        <i className="las la-plus"></i> Add Market
      </Button>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New Market</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddMarket" onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group" id="MarketName">
                <label className="form-label" htmlFor="marketName">
                  Market Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="marketName"
                  value={marketName}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketName'),'input')}
                  onChange={(event: any) => setMarketName(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="MarketDomain">
                <label className="form-label" htmlFor="marketDomain">
                  Market Domain
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="marketDomain"
                  value={marketDomain}
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketDomain'), 'input')}
                  onChange={(event: any) => setMarketDomain(event.target.value)}
                />
                <div className="error"></div>
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

export default Market;
