import { MultiSelect } from "react-multi-select-component";
const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Columns";
  else return selected.map((market: any) => market.label).join(", ");
};
const Columns=(props:any)=>{
    
    return(
        <>
            <div className="col-md-2 form-group" style={{marginLeft:'-40px'}}>
              {/* <label htmlFor="" className="form-label">
                Columns
              </label> */}
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