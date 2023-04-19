import { Button } from "react-bootstrap";

const FilterComponent = (props :any) => (
    <>
        <div className="search-filter" >
            <input type="text" className="search-btn" placeholder="Search"  value={props.filterText} onChange={props.onFilter} />               
            <button type="button" style={{padding:"4px 6px 5px", marginTop:"-2px"}}  className="btn btn-primary" onClick={props.onClear}>
                  X
            </button>
        </div>   
           
                                            
      
    </>
  );
  
  export default FilterComponent;
  