import React, { useMemo, useState } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import FilterComponent from "./FilterComponent";
//import FilterComponent from "./FilterComponent";
import customStyles from "./customStyles";
import { Columns } from "./DownloadBtnAndColumns";
import DownloadBtn from "../Export/DownloadBtn";
const Table = (props: any) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const options=props.columnsAndSelectors.map((item:any)=>({label : item.name, value:item.selector}));
  const [columnsSelected,setColumnsSelected]=useState(props.columnsAndSelectors.filter((columnAndSelector:any)=>columnAndSelector.default=="true").map((columnAndSelector:any)=>({label : columnAndSelector.name, value:columnAndSelector.selector})));

  const onColumnsChange=(event:any)=>{
    console.log(event);
    setColumnsSelected(event);
  }
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  let filteredColumns=props.columns;
  if(columnsSelected.length)
 {
  const columnsSelectedList=columnsSelected.map((column:any)=>column.label);
   filteredColumns=props.columns.filter((column:any)=> columnsSelectedList.includes(column['name'])==true)
   console.log(columnsSelectedList,filteredColumns);
 }
  const filteredItems = props.data.filter(
    (item: any) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );
  let selectedColumnsAndSelectors=columnsSelected;
  if(columnsSelected.length==0)
  selectedColumnsAndSelectors=options;
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
      <div style={{width:'100%', float:"left", display:'flex'}}>
        {/* <div style={{display:'flex'}}> */}
        <Columns
          options={options}
          columnsSelected={columnsSelected}
          onColumnsChange={onColumnsChange}
          ></Columns>
          <DownloadBtn 
                filteredRecords={filteredItems}
                selectedColumnsAndSelectors={selectedColumnsAndSelectors}
                title={props.title}>
          </DownloadBtn>
        {/* </div> */}
      </div>
          <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}/>
      
        </>
        
    );
  }, [filterText, resetPaginationToggle,options,columnsSelected,onColumnsChange]);

  return (
    // <div style={{paddingBottom:'200px'}}>
      <DataTable
      className="table-striped"
      columns={filteredColumns}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={customStyles}
      striped={true}
      persistTableHead={true}
      onRowDoubleClicked={props.onRowDoubleClicked}
    />
    // </div>
  );
};

export default Table;
