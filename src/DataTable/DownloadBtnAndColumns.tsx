import { MultiSelect } from "react-multi-select-component";
const customValueRenderer = (selected: any, _options: any) => {
  return "Columns";
};
const Columns=(props:any)=>{
    
    return(
        <>
            <div className="ClickMultiSelect col-md-2 form-group" style={{marginLeft:'-40px'}}>
              <MultiSelect
                options={props.options}
                value={props.columnsSelected}
                onChange={props.onColumnsChange}
                labelledBy="Select Columns to filter"
                valueRenderer={customValueRenderer}
              />
            </div>
        </>
    )
}


export {Columns};