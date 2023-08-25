import React, { useState } from "react";
import ReactDOM from "react-dom";
import MainPage from "../MainPage/MainPage";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants";
import ToastNotification from "../Toasts/Toast";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/Slices/User";
import optumLogo from "../asset/images/optumLogo.png";
import { ClassRounded } from "@material-ui/icons";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    

    const onLoginButtonSubmitHandler=(event : any)=>{
        event.preventDefault();
        if(username=="tuser" && password=="TestUser@123")
        {
        dispatch(userActions.setUser({username:"Test User",userType:"User"}));
        sessionStorage.setItem("username","Test User");
        sessionStorage.setItem("userType","User")
        navigate(APP_ROUTES.DASHBOARD)
        }
        else if(username=="tadmin" && password=="TestAdmin@123")
        {
            dispatch(userActions.setUser({username:"Test Admin",userType:"Admin"}))
            sessionStorage.setItem("username","Test Admin");
            sessionStorage.setItem("userType","Admin")
            navigate(APP_ROUTES.DASHBOARD)
        }
        else if(username=="leslie" && password=="Leslie@123")
        {
            dispatch(userActions.setUser({username:"Leslie Kiheri",userType:"Admin"}))
            sessionStorage.setItem("username","Leslie Kiheri");
            sessionStorage.setItem("userType","Admin")
            navigate(APP_ROUTES.DASHBOARD)
        }
        else if(username=="ashish" && password=="Ashish@123")
        {
            dispatch(userActions.setUser({username:"Ashish Khare",userType:"Admin"}))
            sessionStorage.setItem("username","Ashish Khare");
            sessionStorage.setItem("userType","Admin")
            navigate(APP_ROUTES.DASHBOARD)
        }
        else
        toast.info("Invalid Username or Password");


        setUsername("");
        setPassword("");
    }
    function handleForgotPassword(){

        document.location='#';
        
        }
    return (
        <div>
        <section className="login">
        
          <div className="login_box">
              
              <div className="right">
                  <div className="right-text">
                      <h2>CPT</h2>
                      {/* <h5>Capacity Planning Tool</h5> */}
                  </div>
                  <div className="right-inductor">
                      {/* <img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt="" /> */}
                      <img src="src\asset\images\web-typing-ergonomics.jpg" alt="" />
                  </div>
              </div>
              <div className="left">
                  {/* <div className="top_link"><a href="#">
                      <img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt="" />Return home</a>
                  </div> */}

<div style={{ /*borderRight: "1px solid #fa600d91"*/ paddingRight: "0px", paddingLeft: "15px",   width: "100px",    height: "28px", marginLeft:"25px" }}><img src={optumLogo} alt="" /></div>
                        <div className = "Capcity-Planning-Tool" style={{ display: "block", paddingLeft: "14.5px", color:"#002677 !important", marginLeft:"25px"  }}>Capacity Planning Tool</div>
                  <div className="contact" style={{    top: "-68px", position: "relative"}}>

                       <form onSubmit={onLoginButtonSubmitHandler}>
                          <h3>Login</h3>
                          <input type="text" placeholder="USERNAME"  value={username} onChange={(event: any)=>setUsername(event.target.value)}/>
                          <input type="password" placeholder="PASSWORD" value={password} onChange={(event: any)=>setPassword(event.target.value)} />
                          <button type="submit" className="btn btn-primary submit" >
                              Login
                          </button>
                      </form> 
                      
                 
                      <div id="u30" className="ax_default cz-color-3355443" data-label="link" data-left="108" data-top="432" data-width="99" data-height="14" layer-opacity="1">
<div id="u31" className="ax_default shape1 cz-color-7808512" data-label="label">
  <div id="u31_div" className="cz-color-7808512"></div>
  <div id="u31_text" className="text cz-color-7808512">
    <p className="cz-color-7808512"><span onClick={handleForgotPassword} style={{textDecoration:"underline", letterSpacing:"-0.26px", cursor:"pointer"}} className="cz-color-7808512">Forgot Password</span></p>
    {/* <a  style={{ textDecoration:"underline", letterSpacing:"-0.26px", color:"#002677 !important"}}  href="#">Forgot Password</a> */}
  </div>
</div>
</div>



                  </div>
              </div>
          </div>
      </section>
        </div>
        
    );
};

export default LoginPage;