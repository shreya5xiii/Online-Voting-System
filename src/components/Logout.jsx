import React from "react";
import { useNavigate } from "react-router-dom";
export default function Logout({ setElem }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("loggedin_admin_name");
    localStorage.removeItem("loggedin_admin_email");
    navigate("/");
  };
  return (
    <div className="addcandidateContainer">
      <div className="overlay">
        <div className="popupDelete">
          <button
            className="close-btn"
            onClick={() => {
              setElem(0);
            }}
          >
            {" "}
            <i className="fa fa-times"></i>
          </button>
          <div className="deleteform">
            <h6>Do you really want to Log Out</h6>

            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
