import React, { useState, useEffect, useRef } from "react";

export default function ElectionCompForCandidate({
  setElem,
  elem,
  setelectionTit,
}) {
  const [allElection, setAllElection] = useState([]);
  const load = useRef([0]);
  useEffect(() => {
    const dbName = localStorage.getItem("loggedin_admin_email");

    if (elem == 1 && dbName) {
      fetch(`http://localhost:8000/ShowAllElectionExceptEnded?dbName=${dbName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          load.current = data;
          console.log(data);
          setAllElection(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    } else {
      console.log("No admin name found in localStorage");
    }
  }, [elem]);

  const addcandidate = (election) => {
    setelectionTit(election);
    setElem(5);
  };
  return (
    <div className="ElectionCompForCandidate">
      <div className="addCandidateTitle addelemctionNav">
   <h1>Elections which will start soon</h1>
      </div>
      <div className="ShowElectionForAddCandidate">
        {allElection.length > 0 ? (
          allElection.map((election, index) => (
            <div className="showEachElectionForCandidate" key={index}>
              <div className="ElectionTitle">
                <h4> {election.electionId} </h4>
                <h3> {election.electionTitle}</h3>
              </div>
              <div className="btndiv">
                <button className="btn" onClick={() => addcandidate(election)}>
                  Add Candidate
                </button>
              </div>
            </div>
          ))
        ) : load.current.length === 0 ? (
          <div className="load" style={{ textAlign: "center" }}>
            <h1>No data Available </h1>
          </div>
        ) : (
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
          </div>
        )}
      </div>
    </div>
  );
}
