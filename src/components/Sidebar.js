import React, { Children } from "react";
import "./navbar.css";
import { FaRegChartBar, FaTh, FaUserAlt, FaBars } from "react-icons/fa";
import { NavLink } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/aboutUs",
      name: "AboutUs",
      icon: <FaUserAlt />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
  ];

  return (
    <div className="containerr" style={{ flex: "20%" }}>
      <div className="sidebar">
        <div className="top_section">
          <h1 class="logo">Logo</h1>
          <div className="bars">
            <FaBars />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
