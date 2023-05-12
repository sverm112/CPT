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
    console.log(event);
    setColumnsSelected(event);
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

  return (
      <DataTable
      className="table-striped"
      columns={filteredColumns}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={customStyles}
      striped={true}
      {...props}
      expandableRowsComponent={props.expandableRowsComponent}
      persistTableHead={true}
      onRowDoubleClicked={props.onRowDoubleClicked}
    />
    // </div>
  );
};

export default Table;
