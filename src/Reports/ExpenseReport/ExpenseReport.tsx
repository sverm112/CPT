import SideBar from "../../SideBar/SideBar";
import allocationByExpense from "../../asset/images/allocation-by-expense.png";
const ExpenseReport = () => {
  return (
    <div>
      <SideBar></SideBar>
      <div className="  col-md-12 bg-mainclass">
        {/* <img src={allocationByExpense} alt="allocation by expense"></img> */}
        <iframe title="ALLOCATION BY EXPENSE TYPE" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=ec4e00d7-a1f6-4811-958a-cb47cad5946c&autoAuth=true&ctid=85f46a4d-265f-41b9-aaef-c494b7617e7f&filterPaneEnabled=false&navContentPaneEnabled=false"></iframe>
      </div>
    </div>
  );
};

export default ExpenseReport;
