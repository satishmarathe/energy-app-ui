import React from "react";

function Header(){
    return(
        <nav>
            <a href="/">Home</a> | <a href="/courses">Courses</a> | <a href="/compare">Compare</a> | {" "}<a href="/about">About</a> | {" "}<a href="/compareAgain">Compare Again</a>  
        </nav>
    )
}
export default Header;