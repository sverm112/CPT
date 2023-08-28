import SideBar from "../../SideBar/SideBar";
import allocationByMarket from "../../asset/images/allocation-by-market.png";
import { closeNav } from "../../SideBar/SideBarJs";
import "../../../src/style.css";
import { ALLOCATION_BY_MARKET_REPORT } from "../../constants";
const MarketReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass wrap-element" onClick={closeNav}>
        {/* <img src={allocationByMarket} alt="allocation by market"></img> */}
        {/* <iframe title="sr" width="1165" height="600" src="https://app.powerbi.com/reportEmbed?reportId=ffa62045-36df-49f0-93ea-b82f4e6626d8&autoAuth=true&ctid=db05faca-c82a-4b9d-b9c5-0f64b6755421&filterPaneEnabled=false&navContentPaneEnabled=false" ></iframe> */}
        <iframe title="Allocation By Market" className="wrapped-iframe"  src={ALLOCATION_BY_MARKET_REPORT}></iframe>
      </div>
    </div>
  );
};

export default MarketReport;
