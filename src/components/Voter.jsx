import React, { useState, useEffect, useRef } from 'react';
import ConfirmVote from './ConfirmVote';
import { useNavigate } from "react-router-dom";
export default function Voter({ setshowForm, colName, showForm, databasename }) {
  const [allcandidate, setallcandidate] = useState([]);
  const [showconfirm, setshowconfirm] = useState(0);
  const candidate = useRef({});
  const navigate = useNavigate();
  const load = useRef([0]);
  useEffect(() => {
    if (showForm === 1) {
      fetch(`http://localhost:8000/ShowAllCandidate?dbName=${databasename}&collectionNameOnElectionId=${colName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          load.current = data;
          setallcandidate(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    } else {
      console.log("No user name found in localStorage");
    }
  }, [showForm, databasename, colName]);

  const confirmVote = (selectedCandidate) => {
  
    candidate.current = selectedCandidate;
    setshowconfirm(1);
  };

  const returnConfirmVote = () => {
    switch (showconfirm){
      case 1:
         return  <ConfirmVote setshowForm={setshowForm}  candidate={candidate.current} setshowconfirm={setshowconfirm} colName={colName} databasename={databasename}/>
      default:
        return <div></div>
    }
 
  
       
  };
const removevoter=()=>{
  localStorage.removeItem("voter_email");
    localStorage.removeItem("voter_name");
    navigate("/");
}
  return (
    <div className="voterCont">
      {returnConfirmVote()}
      <div className="voterNav">
        {/* <h3 style={{backgroundColor:"red"}}>{electionTit.electionTitle}</h3> */}
        <button className="btn" onClick={removevoter}>Logout <i className="fa fa-sign-out"></i></button>
      </div>

      <div className="allcandidateCont">
        {allcandidate.length > 0 ? (
          allcandidate.map((candidate) => (
            <div key={candidate.candidateId} className="eachCandidate">
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{candidate.candidateId}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{candidate.candidateName}</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{candidate.candidateAge}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{candidate.candidateEmail}</td>
                  </tr>
                </tbody>
              </table>

              <div className="allbtn">
                <button className="btn" onClick={() => confirmVote(candidate)}>Vote</button>
              </div>
            </div>
          ))
        ) : load.current.length === 0 ? (
          <div className="load" style={{ textAlign: "center" }}>
            <h1>No data Available </h1>
          </div>
        ) :(
          <div className="load" style={{ textAlign: "center" }}>
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div> )}
      </div>
    </div>
  );
}
