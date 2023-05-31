import React, { useMemo, useState, useEffect } from "react";

import DataTable, { createTheme } from "react-data-table-component";
import FilterComponent from "./FilterComponent";
//import FilterComponent from "./FilterComponent";
import customStyles from "./customStyles";
import { Columns } from "./DownloadBtnAndColumns";
import {HoverMultiSelect} from './HoverMultiSelect';
import DownloadBtn from "../Export/DownloadBtn";
// import ContentLoader from 'react-content-loader';
import {RotatingLines} from 'react-loader-spinner';

const Table = (props: any) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const options=props.columnsAndSelectors?.map((item:any)=>({label : item.name, value:item.selector}));
  const [columnsSelected,setColumnsSelected]=useState(props.columnsAndSelectors?.filter((columnAndSelector:any)=>columnAndSelector.default=="true").map((columnAndSelector:any)=>({label : columnAndSelector.name, value:columnAndSelector.selector})));
  
  const onColumnsChange=(event:any)=>{
    // console.log("Options: ",options);
    // console.log("Passed Columns: ", props.columns);
    let newColumns: any[] =[] ;
    //  = options.map((op : any)=>{event.find((ev: any)=>ev.value == op.value)})
    for(const op of options){
      if(event.find((e: any)=> e.value == op.value)){
        let x = {
          label: op.label,
          value: op.value
        }
        newColumns.push(x);
      }
    }
    // console.log("New Column Changes: ",newColumns);
    setColumnsSelected(newColumns);
  }
  let filteredColumns=props.columns;
  if(columnsSelected?.length)
 {
  const columnsSelectedList=columnsSelected?.map((column:any)=>column.label);
   filteredColumns=props.columns.filter((column:any)=> columnsSelectedList.includes(column['name'])==true)
   console.log(columnsSelectedList,filteredColumns);
 }
  const filteredItems = props.data.filter(
    (item: any) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );
  let selectedColumnsAndSelectors=columnsSelected;
  if(columnsSelected?.length==0)
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
      <div style={{width:'100%', float:"left", justifyContent:'space-between'}}>
          <div className="DownloadAndDropdown" style={{width:'82%', float:"left", display:'flex'}}>/          
            <HoverMultiSelect
            options={options}
            columnsSelected={columnsSelected}
            onColumnsChange={onColumnsChange}
            ></HoverMultiSelect> 
            <DownloadBtn 
                  filteredRecords={filteredItems}
                  selectedColumnsAndSelectors={selectedColumnsAndSelectors}
                  title={props.title}>
            </DownloadBtn>
          </div>
          <div className="SearchFilter">
            <FilterComponent
              onFilter={(e: any) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}/>
          </div>
      </div>
        </>
    );
  }, [filterText, resetPaginationToggle,options,columnsSelected,onColumnsChange]);

  console.log("Filtered Items", filteredItems);
  console.log("Filtered Text", filterText);
  return (
      <DataTable
      className="table-striped"
      // {...props}
      columns={filteredColumns}
      expandableRowExpanded = {props.expandableRowExpanded}
      expandOnRowClicked = {props.expandOnRowClicked}
      onRowClicked = {props.onRowClicked}
      onRowExpandToggled = {props.onRowExpandToggled}
      expandableRows = {props.expandableRows}
      expandableRowsComponent = {props.expandableRowsComponent}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={customStyles}
      striped={true}
      // expandableRowsComponent={props.expandableRowsComponent}
      persistTableHead={true}
      onRowDoubleClicked={props.onRowDoubleClicked}
    />
    // </div>
  );
};

export default Table;
