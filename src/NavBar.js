import React, { useContext } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

const NavBar = ({ logout }) => {
  const currUser = useContext(UserContext);
  return (
    <Navbar color="dark" dark expand="md">
      <NavLink className="nav-link navbar-brand" exact to="/">
        Jobly
      </NavLink>

      <Nav navbar className="me-auto">
        {currUser && (
          <NavItem>
            <NavLink exact to="/companies" className="nav-link">
              Companies
            </NavLink>
          </NavItem>
        )}

        {currUser && (
          <NavItem>
            <NavLink exact to="/jobs" className="nav-link">
              Jobs
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <Nav navbar>
        {currUser && (
          <NavItem>
            <NavLink exact to="/profile" className="nav-link">
              {currUser.username}
            </NavLink>
          </NavItem>
        )}
        {!currUser && (
          <NavItem>
            <NavLink exact to="/login" className="nav-link">
              Login
            </NavLink>
          </NavItem>
        )}

        {!currUser && (
          <NavItem>
            <NavLink exact to="/register" className="nav-link">
              Register
            </NavLink>
          </NavItem>
        )}
        {currUser && (
          <NavItem>
            <NavLink exact to="/logout" className="nav-link" onClick={logout}>
              Logout
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
