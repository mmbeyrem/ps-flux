import React from 'react'
import { NavLink } from "react-router-dom";
function Header() {
    const activeStyle = { color: "orange" };
    return <nav className="navbar">
        <NavLink className="navbar-brand" activeStyle={activeStyle} exact to="/"  >homePage</NavLink>
        <NavLink className="navbar-brand" activeStyle={activeStyle} to="/courses">Courses </NavLink>
        <NavLink className="navbar-brand" activeStyle={activeStyle} to="/about">about </NavLink>
    </nav>
}

export default Header;