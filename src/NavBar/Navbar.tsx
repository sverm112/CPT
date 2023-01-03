import React from "react";
import "./Navbar.css";
const NavBar = () => {
    return (
        <div>
            {/* navbar start */}
            <div>
                <nav className="navbar navbar-expand-lg text-white" style={{position: "fixed", width: "100%", top: "0px", zIndex: "99999999"}}>
                    <a className="navbar-brand nav-title" href="#"><span style={{ borderRight: "1px solid #fa600d91", paddingRight: "3px" }}>Optum</span>
                        <span style={{ paddingLeft: "3px" }}>CPT</span>
                    </a>
                    <div className="collapse navbar-collapse">
                    </div>
                </nav>
            </div>
            {/* navbar end */}
            
        </div>
    );
};

export default NavBar;