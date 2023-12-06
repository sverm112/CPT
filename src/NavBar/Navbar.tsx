import React from "react";
import "./Navbar.css";
import optumLogo from "../asset/images/optumLogo.png";
const NavBar = () => {
    return (
        <div>
            {/* navbar start */}
            <div>
            
                <nav className="navbar navbar-expand-lg" style={{position: "relative", width: "100%", marginLeft:"45px", top: "0px", zIndex: "99"}}>
                
                <div className="navbar-brand nav-title" style={{ position: "fixed", left: "55px", width:'20%'}}>
                        {/* <a id="OptumLogoAnchor" href="#/Dashboard" style={{display:"block", width: "100px !important"}}> */}
                            <div style={{ /*borderRight: "1px solid #fa600d91"*/ paddingRight: "10px",   width: "100px",    height: "28px" }}>
                                <img src={optumLogo} alt="" />
                            </div>
                        {/* </a>  */}
                        {/* <a href="#/Dashboard"> */}
                            <div className = "Capcity-Planning-Tool" style={{ display: "block", color:"#002677 !important", fontSize: "21px"  }}>
                                Capacity Planning Tool
                            </div>
                        {/* </a>  */}
                    </div>

                    <div className="collapse navbar-collapse">
                    </div>
                </nav>
            </div>

           
            {/* navbar end */}
            
        </div>
    );
};

export default NavBar;