import { Button } from "react-bootstrap";

const FilterComponent = (props :any) => (
    <>
        <div className="search-filter" style={{whiteSpace:'nowrap'}}>
            <input type="text" style={{borderTopRightRadius: "0px", borderBottomRightRadius: "0px"}} className="search-btn" placeholder="Search"  value={props.filterText} onChange={props.onFilter} />               
            <button type="button" style={{padding:"4px 8px 5px", marginTop:"-2px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}  className="btn btn-primary" onClick={props.onClear}>
                  X
            </button>
        </div>   
           
                                            
      
    </>
  );
  
  export default FilterComponent;
  