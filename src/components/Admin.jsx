import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AddElection from "./AddElection";
import AddCandidate from "./AddCandidate";
import DeclareResult from "./DeclareResult";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import ElectionCompForCandidate from "./ElectionCompForCandidate";
import ElectionHistory from "./ElectionHistory";
export default function Admin() {
  const [elem, setElem] = useState(0);
  const navigate = useNavigate();
  const [electionTit, setelectionTit] = useState([]);
  const adminElement = [
    "Add Election",
    "Add Candidate",
    "Declare Result",
    "History",
    "Log Out",
  ];
 useEffect(()=>{
 if(localStorage.getItem("loggedin_admin_email")==null||  localStorage.getItem("loggedin_admin_name")==null){
    navigate("/");
  }
 },[])
  const renderComponent = () => {
    switch (elem) {
      case 0:
        return <AddElection />;
      case 1:
        return (
          <ElectionCompForCandidate
            setElem={setElem}
            elem={elem}
            setelectionTit={setelectionTit}
          />
        );
      case 2:
        return <DeclareResult elem={elem} />;
      case 3:
        return <ElectionHistory elem={elem} />;
      case 4:
        return <Logout setElem={setElem} />;
      case 5:
        return <AddCandidate electionTit={electionTit} setElem={setElem} />;
      default:
        return <AddElection />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar setElem={setElem} adminElement={adminElement} />
      {renderComponent()}
    </div>
  );
}
