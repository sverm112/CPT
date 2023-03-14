import { Button } from "react-bootstrap";

const FilterComponent = (props :any) => (
    <>
        <div className="search-filter" style={{marginTop:'-50px'}}>
            <input type="text" className="search-btn" placeholder="Search"  value={props.filterText} onChange={props.onFilter} />               
            <button type="button"  className="btn btn-primary" onClick={props.onClear}>
                  X
            </button>
        </div>   
           
                                            
      
    </>
  );
  
  export default FilterComponent;
  