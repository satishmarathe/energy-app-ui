import React from "react";
import AboutPage from "./AboutPage.js";
import HomePage from "./HomePage.js";
import EnergyBillsPage from "./EnergyBillsPage.js";
import Header from "../common/Header.js";

function App(){
    function getPage(){
        /** get the browser url path details and then dtermine which page to got to */
        const route = window.location.pathname;
        if(route === "/about"){
            return <AboutPage/>;
        }else if(route === "/courses"){
            return <EnergyBillsPage/>;
        }else{
            return <HomePage/>;
        }
    }
            
    return(
        <React.Fragment>
            <Header/>
            {getPage()}
        </React.Fragment>
    );  
}

export default App;
