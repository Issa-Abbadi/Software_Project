import React, { Children } from "react";
import "./navbar.css";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/home",
      name: "الرئيسية",
      icon: <FaTh />,
    },
    {
      path: "/aboutUs",
      name: "عن متجرك",
      icon: <FaUserAlt />,
    },
    {
      path: "/analytics",
      name: "احصائيات",
      icon: <FaRegChartBar />,
    },
    {
      path: "/comment",
      name: "التعليقات",
      icon: <FaCommentAlt />,
    },
    {
      path: "/product",
      name: "المنتجات",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "قائمة المنتجات",
      icon: <FaThList />,
    },
  ];

  return (
    <div className="containerr" style={{ width: "20%" }}>
      <div className="sidebar">
        <div className="top_section">
          <div className="bars" style={{ height: "20px" }}></div>
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
    </div>
  );
};

export default Sidebar;
