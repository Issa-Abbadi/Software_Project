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
import { NavLink } from "react-router-dom";

const Sidebar = (props, { children }) => {
  const menuItem = [
    {
      path: "/admin",
      name: "الرئيسية",
      icon: <FaTh />,
    },
    // {
    //   path: "/admin",
    //   name: "عن متجرك",
    //   icon: <FaUserAlt />,
    // },
    {
      path: "/admin",
      name: "احصائيات",
      icon: <FaRegChartBar />,
    },
    {
      path: "/admin",
      name: "أضف منتج",
      icon: <FaCommentAlt />,
    },
    // {
    //   path: "/admin",
    //   name: "تعديل منتج",
    //   icon: <FaCommentAlt />,
    // },
    // {
    //   path: "/admin",
    //   name: "المنتجات",
    //   icon: <FaShoppingBag />,
    // },
    {
      path: "/admin",
      name: "قائمة المنتجات",
      icon: <FaThList />,
    },
  ];

  return (
    <div className="containerr" style={{ width: "20%", margin: "0" }}>
      <div className="sidebar">
        <div className="top_section">
          <div className="bars" style={{ height: "20px" }}></div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            state={{ Name: item.name }}
            key={index}
            className="link "
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text ">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
