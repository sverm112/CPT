import React, { useState } from 'react';
import nouserimage from "../asset/images/noimage-User.jpg";
import "./SideBar.css";
import "../style.css";
import Collapsible from 'react-collapsible';
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import "./SideBarJs";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../Store/Slices/User';

import vector_u79 from "../asset/images/vector_u79.png";

const func2 = (element: string) => {
    // var elementcls = document.getElementsByClassName("nav-link");
    // if (elementcls != null)
    //     elementcls.classList.remove("active");
    var elements = document.getElementById(element);
    if (elements != null)
        elements.classList.remove("active");
}

const SideBar = () => {
    const dispatch=useDispatch();
    const [isMasterActive, setIsMasterActive] = useState(false);
    const [isReportActive, setIsReportActive] = useState(false);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
    };
    const [show, setShow] = useState(false);
    const username= useSelector((state:any)=>state.User.username);
    const userType= useSelector((state:any)=>state.User.userType);
    const handleLogout =()=>{
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userType");
        dispatch(userActions.setUser({username:"",userType:""}))
        navigate(APP_ROUTES.LOGINPAGE)
    }
    return (
        <div id="body-pd">
            <header className="header" id="header" style={{ position: "fixed", top: "0px", height: "70px", zIndex: 9}}>
                <div className="header_toggle" style={{marginLeft: "0px"}}>
                    <i className="fas fa-bars text-white" onClick={handleClick} style={{boxSizing: "border-box",  borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(0, 38, 119, 1)"}}></i>
                </div>
                
                {/* <div style={{ color: "#fff", whiteSpace: "nowrap", marginLeft:'200px', fontSize:'23px' }}>Capacity Planning Tool</div> */}

               
               
                <div id="u74" className="ax_default"  style={{zIndex: "1002", cursor:"pointer"}} onClick={() => { navigate(APP_ROUTES.HELP) }}>
        <div id="u74_state0" className="panel_state" data-label="State 1">
          <div id="u74_state0_content" className="panel_state_content">

            {/* <!-- Frame 2 (Group) --> */}
            <div id="u75" className="ax_default" data-label="Frame 2" data-left="0" data-top="0" data-width="99" data-height="40" layer-opacity="1">

              {/* <!-- Frame 2 BG (Rectangle) --> */}
              <div id="u76" className="ax_default shape1" data-label="Frame 2 BG" >
                <div id="u76_div" className=""></div>
                <div id="u76_text" className="text " style={{display:"none", visibility: "hidden"}}>
                  <p></p>
                </div>
              </div>

              {/* <!-- Unnamed (Rectangle) --> */}
              <div id="u77" className="ax_default shape1">
                <div id="u77_div" className=""></div>
                <div id="u77_text" className="text ">
                  <p><span style={{letterSpacing:"0.04px"}}>H</span><span style={{letterSpacing:"0.04px"}}>elp</span></p>
                </div>
              </div>

              {/* <!-- info_filled (Group) --> */}
              <div id="u78" className="ax_default" data-label="info_filled" data-left="8" data-top="13" data-width="15" data-height="15" layer-opacity="1">

                {/* <!-- Vector (Shape) --> */}
                <div id="u79" className="ax_default shape1" data-label="Vector">
                  <img id="u79_img" className="img " src={vector_u79}/>
                  <div id="u79_text" className="text " style={{display:"none", visibility: "hidden"}}>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

                <div>
                    <div className="dropdowns" style={{ float: "right" }}>
                        <input type="checkbox" id="box" style={{display:"none"}}/>
                        <label htmlFor ="box" style={{marginBottom: "0px"}}>
                            <div className="dropbtns">
                                <span style={{ padding: "10px 10px 10px 10px", lineHeight: "40px", color:"black" }}>{username}</span>
                                <div className="header_img" style={{ float: "right" }}>
                                    <img src={nouserimage} alt="" />
                                </div>
                            </div>
                        </label>
                        <div className="dropdowns-content" >
                            <a className="logoutbtn" href="" onClick={handleLogout}>Sign out</a>
                        </div>
                    </div>
                </div>
            </header>
            {/* <div className="l-navbar show" id="nav-bar"> */}
            <div className={isActive ? 'l-navbar show' : 'l-navbar'} id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav_list">
                            <Link  to="/Dashboard"  className="nav_link" id="Home" onClick={() => { navigate(APP_ROUTES.DASHBOARD) }}>
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <span className="nav_name">Dashboard</span>
                            </Link>
                           {userType=="Admin" &&  <a className="nav_link" id="MasterEntry" onClick={() => func2("MasterEntry")}>
                                <span className="nav_name">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <i className="las la-user-tie" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 sidebardrpdwn" onClick={() => setIsMasterActive(!isMasterActive)}>
                                            <div className="caretdrpdwn">
                                                <i className={isMasterActive ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                                            </div>
                                            <Collapsible trigger="Master Entry">
                                                <ul className="Collapsible-ul">
                                                    <li className="Collapsible-li"><Link to="/Master/MarketDetails" onClick={() => { navigate(APP_ROUTES.MARKET) }}>Market Details </Link> </li>
                                                    <li className="Collapsible-li"><Link to="/Master/EmployeeDetails" onClick={() => { navigate(APP_ROUTES.EMPLOYEEMASTER) }} >Resource Details</Link></li>
                                                    <li className="Collapsible-li"><Link to="/Master/ProjectDetails" onClick={() => { navigate(APP_ROUTES.PROJECTINFO) }}>Project Details</Link></li>
                                                    <li className="Collapsible-li"><Link to="/Master/HolidayDetails" onClick={() => { navigate(APP_ROUTES.HOLIDAYMASTER) }}>Holiday Details</Link></li>
                                                    <li className="Collapsible-li"><Link to="/Master/PTO" onClick={() => { navigate(APP_ROUTES.PAIDTIMEOFF) }}>PTO Details</Link></li>
                                                </ul>
                                            </Collapsible>
                                        </div>
                                    </div>
                                </span>
                            </a>}
                            {userType=="Admin" && <Link to="/ProjectAllocation" className="nav_link" id="ProjectAllocation" onClick={() => { navigate(APP_ROUTES.PROJECTALLOCATION) }}>
                                <i className="las la-user-circle" aria-hidden="true"></i>
                                <span className="nav_name">Project Allocation</span>
                            </Link>}
                            <a className="nav_link" id="ReportsList">
                                <span className="nav_name">
                                    
                                    <div className="row">
                                        <div className="col-md-2" id="reports">
                                            <i className="las la-file-alt" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 sidebardrpdwn" onClick={() => setIsReportActive(!isReportActive)}>
                                            <div className="caretdrpdwn">
                                                <i className={isReportActive ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                                            </div>
                                            <Collapsible trigger="Report">
                                                <ul className="Collapsible-ul">
                                                    <li className="Collapsible-li"><Link to="/Report/AllocationMarketReport" onClick={() => { navigate(APP_ROUTES.ALLOCATIONMARKETRPOT) }}>Allocation By Market </Link></li>
                                                    <li className="Collapsible-li"><Link to="/Report/AllocationResourceReport" onClick={() => { navigate(APP_ROUTES.ALLOCATIONRESOURCERPOT) }}>Allocation By Resource<br/>& PTO Tracker</Link></li>
                                                    <li className="Collapsible-li"><Link to="/Report/AllocationProjectReport" onClick={() => { navigate(APP_ROUTES.ALLOCATIONPROJECTRPOT) }}>Allocation By Project</Link></li>
                                                    <li className="Collapsible-li"><Link to="/Report/HolidayListReport" onClick={() => { navigate(APP_ROUTES.HOLIDAYLISTRPOT) }}>Holiday List</Link></li>
                                                </ul>
                                            </Collapsible>
                                        </div>
                                    </div>
                                </span>
                            </a>
                            {/* <a href="" className="nav_link" onClick={() => { navigate(APP_ROUTES.ABOUTUS) }}>
                                <i className="las la-info-circle" aria-hidden="true"></i>
                                <span className="nav_name">About Us</span>
                            </a> */}
                            {/* <Link  to="/Help" className="nav_link" onClick={() => { navigate(APP_ROUTES.HELP) }}>
                                <i className="las la-question-circle" aria-hidden="true"></i>
                                <span className="nav_name">Help</span>
                            </Link> */}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;