import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { APP_ROUTES } from "../constants";
import AboutUs from "../AboutUs/AboutUs";

const MainPage = () => {
    return (
        <div>
            <SideBar></SideBar>
            <div className="col-md-12 bg-mainclass">
            </div>
        </div>
    );
};
export default MainPage;