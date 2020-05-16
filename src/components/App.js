import React from "react";
import AboutPage from "./AboutPage.js";
import HomePage from "./HomePage.js";

function App(){
    
        /** get the browser url path details and then dtermine which page to got to */
        const route = window.location.pathname;
        if(route === "/about"){
            return <AboutPage/>;
        }else{
            return <HomePage/>;
        }
  
}

export default App;
