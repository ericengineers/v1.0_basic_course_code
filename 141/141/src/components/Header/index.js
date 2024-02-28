import React, { useContext } from "react";
import { navContext } from "../../context/nav";
const Header =()=>{
    const [state,dispatch]=useContext(navContext)

        return (
            <div>头部{state.flag}</div>
        )
    
}

export default Header;