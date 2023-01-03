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

const columns = [
  {
    name: "Market Id",
    selector: (row: { marketId: any }) => row.marketId,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Market",
    selector: (row: { marketCode: any }) => row.marketCode,
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
  else return selected.map((market: any) => market.label).join(", ");
};

const Market = () => {
  const marketCodes = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];
  const dispatch = useDispatch();
  const markets = useSelector((store: any) => store.Market.data);
  const marketCodeSelected = useSelector((store: any) => store.Market.marketCode);
  const toggle = useSelector((store: any) => store.Market.toggle);

  const getMarketDetails = async () => {
    const response = await fetch("https://localhost:44314/api/markets");
    const dataGet = await response.json();
    dispatch(marketActions.changeData(dataGet));
  };
  useEffect(() => {
    getMarketDetails();
  }, [toggle]);
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Market</h1>
            <p>
              <span className="Heading-P-Cls">Master</span>
              <span>Market</span>
            </p>
            <div className="btns market">
              <button type="button" className="btn btn-primary upload-button-btn" >
                <i className="las la-file-upload"></i>
              </button>
              <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                
              />
              <ModalDialog />
            </div>
          </div>
          <div className="row filter-row">
            <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Market 
              </label>
              <MultiSelect
                options={marketCodes}
                value={marketCodeSelected}
                onChange={(event: any) => dispatch(marketActions.changeMarketCode(event))}
                labelledBy="Select Market Code"
                valueRenderer={customValueRenderer}
              />
            </div>
          </div>
          <Table columns={columns} data={markets} />
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
  const [marketCode, setMarketCode] = useState("");
  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let dataPost = {
      market: marketCode,
    };
    try {
      const response = await fetch("https://localhost:44314/api/market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      console.log(response);
      dispatch(marketActions.changeToggle());
    } catch {
      console.log("Hi");
    }
    // setMarketId("");
    //   setMarketCode("");
    //   invokeModal(false);
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
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New Market</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="marketCode">
                  Market 
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="marketCode"
                  value={marketCode}
                  onChange={(event: any) => setMarketCode(event.target.value)}
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

export default Market;
