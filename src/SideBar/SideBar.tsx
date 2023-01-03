import React, { useState } from 'react';
import nouserimage from "../asset/images/noimage-User.jpg";
import "./SideBar.css";
import "../style.css";
import Collapsible from 'react-collapsible';
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import "./SideBarJs";

const func2 = (element: string) => {
    // var elementcls = document.getElementsByClassName("nav-link");
    // if (elementcls != null)
    //     elementcls.classList.remove("active");
    var elements = document.getElementById(element);
    if (elements != null)
        elements.classList.remove("active");
}

const SideBar = () => {
    const [isMasterActive, setIsMasterActive] = useState(false);
    const [isReportActive, setIsReportActive] = useState(false);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
    };
    const [show, setShow] = useState(false);

    return (
        <div id="body-pd">
            <header className="header" id="header" style={{ position: "fixed", top: "40px", height: "50px" }}>
                <div className="header_toggle">
                    <i className="fas fa-bars text-white" onClick={handleClick}></i>
                </div>
                <div style={{ color: "#fff", whiteSpace: "nowrap" }}>Capacity Planning Tool</div>
                <div>
                    <div className="dropdowns" style={{ float: "right" }}>
                        <button className="dropbtns">
                            <span style={{ padding: "10px 10px 10px 10px", lineHeight: "40px" }}>Subhanshu Verma</span>
                            <div className="header_img" style={{ float: "right" }}>
                                <img src={nouserimage} alt="" />
                            </div>
                        </button>
                        <div className="dropdowns-content">
                            <a className="logoutbtn" href="" onClick={() => { navigate(APP_ROUTES.LOGINPAGE) }}>Logout</a>
                        </div>
                    </div>
                </div>
            </header>
            {/* <div className="l-navbar show" id="nav-bar"> */}
            <div className={isActive ? 'l-navbar show' : 'l-navbar'} id="nav-bar">
                <nav className="nav">
                    <div>
                        <div className="nav_list">
                            <a className="nav_link" href="#" id="Home"  onClick={() => { navigate(APP_ROUTES.DASHBOARD) }}>
                                <i className="fa fa-home" aria-hidden="true"></i>
                                <span className="nav_name">Home</span>
                            </a>
                            <a className="nav_link" id="MasterEntry" onClick={() => func2("MasterEntry")}>
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
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.EMPLOYEEMASTER) }} > Employee Details</a></li>
                                                    
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.MARKET) }}>Market</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.PROJECTINFO) }}>Project Info</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.HOLIDAYMASTER) }}>Holiday Details</a></li>
                                                </ul>
                                            </Collapsible>
                                        </div>
                                    </div>
                                </span>
                            </a>
                            <a href="#" className="nav_link" id="ProjectAllocation" onClick={() => { navigate(APP_ROUTES.PROJECTALLOCATION) }}>
                                <i className="las la-user-circle" aria-hidden="true"></i>
                                <span className="nav_name">Project Allocation</span>
                            </a>
                            <a className="nav_link">
                                <span className="nav_name">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <i className="las la-file-alt" aria-hidden="true"></i>
                                        </div>
                                        <div className="col-md-10 sidebardrpdwn" onClick={() => setIsReportActive(!isReportActive)}>
                                            <div className="caretdrpdwn">
                                                <i className={isReportActive ? 'fa fa-caret-up' : 'fa fa-caret-down'} aria-hidden="true"></i>
                                            </div>
                                            <Collapsible trigger="Report">
                                                <ul className="Collapsible-ul">
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.ALLOCATIONHOURSRPOT) }}>ByAllocationHours</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.ABVAILABILITYRPOT) }}>ByAvailability</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.EXPENSERPOT) }}>ByExpense</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.MARKETRPOT) }}>ByMarket</a></li>
                                                    <li className="Collapsible-li"><a href="" onClick={() => { navigate(APP_ROUTES.PROJECTRPOT) }}>ByProject</a></li>
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
                            <a href="#" className="nav_link" onClick={() => { navigate(APP_ROUTES.HELP) }}>
                                <i className="las la-question-circle" aria-hidden="true"></i>
                                <span className="nav_name">Help</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;