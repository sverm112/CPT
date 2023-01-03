import SideBar from "../../SideBar/SideBar";
import allocationByMarket from "../../asset/images/allocation-by-market.png";
const MarketReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass">
        {/* <img src={allocationByMarket} alt="allocation by market"></img> */}
        {/* <iframe title="sr" width="1165" height="600" src="https://app.powerbi.com/reportEmbed?reportId=ffa62045-36df-49f0-93ea-b82f4e6626d8&autoAuth=true&ctid=db05faca-c82a-4b9d-b9c5-0f64b6755421&filterPaneEnabled=false&navContentPaneEnabled=false" ></iframe> */}
        <iframe title="ALLOCATION BY MARKET" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=88a2528d-fc8f-45cf-8861-aa19d9e19b88&autoAuth=true&ctid=85f46a4d-265f-41b9-aaef-c494b7617e7f&filterPaneEnabled=false&navContentPaneEnabled=false" ></iframe>     
      </div>
    </div>
  );
};

export default MarketReport;
