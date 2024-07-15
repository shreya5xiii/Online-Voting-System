import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminNavbar(props) {
  const icons = [
    "fa fa-plus",
    "fa fa-user",
    "fa fa-list",
    "fa fa-history",
    "fa fa-sign-out",
  ];

  return (
    <div className="adminNavbar" style={{ height: "100vh" }}>
      <h1>Admin Dashboard</h1>
      <div className="buttons">
        {props.adminElement.map((element, index) => (
          <button
            key={index}
            onClick={() => props.setElem(index)}
            className="insidebtn"
          >
            <i className={icons[index]}></i>
            <span>{element}</span>
            <div className="tooltip">{element}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
