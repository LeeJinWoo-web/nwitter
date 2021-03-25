import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({ userObj }) => (
    <nav>
       <ul>
           <li>
               <Link to="/">Home</Link>
           </li>
           <li>
               <Link to="/profile">{userObj.displayName === null ? "To set a display name" : userObj.displayName+"'s PROFILE"}</Link>
           </li>
       </ul>
    </nav>
)

export default Navigation;