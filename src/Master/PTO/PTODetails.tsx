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
    selector: (row: { endDate: any }) => row.endDate,
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

  resources.map((resource: any) => {
    if (managers.indexOf(resource.manager) === -1) {
      managers.push(resource.manager);
    }
  })

  const getPTODetails = async () => {
    try {
      const response = await fetch("http://10.147.172.18:9190/api/v1/PTOs/GetAllPTOs");
      let dataGet = await response.json();
      dataGet = dataGet.map((row: any) => ({ ...row, isActive: row.isActive == 1 ? "Active" : "InActive" }));
      dispatch(ptoActions.changeData(dataGet));
    }
    catch {
      console.log("Error occured");
    }
  };
  useEffect(() => {
    getPTODetails();
  }, [toggle]);

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
              <ModalDialog />
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

            {/* <div className="col-md-2 form-group">
              <label htmlFor="" className="form-label">
                Expense Type
              </label>
              <MultiSelect
                options={expenseTypes}
                value={expenseTypeSelected}
                onChange={(event: any) => dispatch(projectActions.changeExpenseType(event))}
                labelledBy="Select Expense Type"
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
                onChange={(event: any) => dispatch(projectActions.changeStatus(event))}
                labelledBy="Select Status"
                valueRenderer={customValueRenderer}
              />
            </div> */}
            <div className="col-md-2" style={{ marginTop: "24px" }}>
              <button type="button" className="btn btn-primary" onClick={() => dispatch(ptoActions.clearFilters())}>Clear Filters<i className="las la-filter"></i></button>
            </div>
          </div>
          <div className="TableContentBorder">
            <Table  columnsAndSelectors={columnsAndSelectors} columns={filteredColumns} data={resources} customValueRenderer={customValueRenderer} title={title}/>
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
        <i className="las la-plus"></i> Add PTO
      </Button>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Add New PTO</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="AddMarket" onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group" id="MarketName">
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
                  onBlur = {()=>validateSingleFormGroup(document.getElementById('MarketName'),'input')}
                  onChange={(event: any) => setMarketName(event.target.value)}
                />
                <div className="error"></div>
              </div>
              <div className="col-md-6 form-group" id="MarketDomain">
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

export default PTO;
