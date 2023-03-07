import { MultiSelect } from "react-multi-select-component";
const customValueRenderer = (selected: any, _options: any) => {
  return "Columns";
};
const HoverMultiSelect =(props:any)=>{
    
    return(
        <>
            <div className="HoverMultiSelect form-group" style={{marginLeft:'10px'}}>
              {/* <label htmlFor="" className="form-label">
                Columns
              </label> */}
              <MultiSelect
                options={props.options}
                value={props.columnsSelected}
                onChange={props.onColumnsChange}
                labelledBy="Select Columns to filter"
                valueRenderer={customValueRenderer}
                shouldToggleOnHover={true}
            
              />
            </div>
        </>
    )
}


export {HoverMultiSelect};