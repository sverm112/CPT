import SideBar from "../SideBar/SideBar";
import { Card } from "react-bootstrap";

const Help = () => {
    return(
        <>
            <SideBar></SideBar>
            <div className="  col-md-12 bg-mainclass">
                    <div className="row Page-Heading">
                        <h1 className="Heading-Cls">Help</h1>
                        
                    </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-8 mb-3 offset-md-1">
                                    <Card
                                        border="primary" 
                                    >
                                        <Card.Header>Phone</Card.Header>
                                        <Card.Body>
                                            <div>
                                                <div>
                                                    <i className="las la-phone mr-2"></i>
                                                    9876543212
                                                </div>
                                                <div>
                                                    <i className="las la-phone mr-2"></i>
                                                    9876543213
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col-md-8 mb-3 offset-md-1">
                                        <Card
                                            border="primary" 
                                        >
                                            <Card.Header>Email</Card.Header>
                                            <Card.Body>
                                                <div>
                                                <div>
                                                    <i className="las la-envelope mr-2"></i>
                                                    support1@optum.com
                                                </div>
                                                <div>
                                                    <i className="las la-envelope mr-2"></i>
                                                    support2@optum.com
                                                </div>
                                            </div>
                                            </Card.Body>
                                        </Card>
                                </div>
                                <div className="col-md-8 offset-md-1">
                                    <Card
                                        border="primary"
                                    >
                                        <Card.Header>Address</Card.Header>
                                        <Card.Body>
                                            <div>
                                                <div>
                                                    <i className="las la-map-marker mr-2"></i>
                                                    Avance Business Hub, Phoenix SEZ, Gachibowli, Telangana 500081
                                                </div>
                                                
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                    </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                    <div className="col-md-8 offset-md-1">
                                        <div className="row Page-Heading">
                                            <h1 className="Heading-Cls">Contact Us</h1>                           
                                        </div>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label className="form-label" htmlFor="fullname">Full Name</label>
                                                    <input type="text" className="form-control" id="fullname" />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="form-label" htmlFor="officeEmailId">Office Email Id</label>
                                                    <input type="text" className="form-control" id="officeEmailId" />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="form-label" htmlFor="comments">Comments</label>
                                                    <textarea className="form-control" id="comments"/> 
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary" style={{ float: "right" }} >Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </>
    )
}

export default Help;