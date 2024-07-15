import React, { useEffect, useState, useRef } from "react";

export default function HistoryComp({
  showHistoryComp,
  election,
  setshowHistoryComp,
}) {
  console.log(election);
  const [allWinner, setAllwinner] = useState([]);
  const maxVote = useRef(0);
  const load = useRef([0]);
  const total = useRef([0]);
  useEffect(() => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    const colName = election.electionId;

    if (showHistoryComp == 1 && dbName) {
      fetch(
        `http://localhost:8000/WinnerListForHistory?dbName=${dbName}&colName=${colName}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          load.current = data;
          const k = data.map((obj) => obj.candidateVote);         
          const sum = k.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        total.current=sum
          maxVote.current = data[0].candidateVote;
          setAllwinner(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    } else {
      console.log("Waiting");
    }
  }, [showHistoryComp]);

  return (
    <div className="addelectionContainer">
      <div className="addelemctionNav">
        <div className="winningInfo">
        <i className="fa fa-arrow-left" onClick={()=>setshowHistoryComp(0)} ></i>
          <h2>Election Title : {election.electionTitle}</h2>
          <h4>Total Voters : { total.current}</h4>
        </div>
      </div>
      <div className="showAllElection">
        <h1>Winner</h1>
        {allWinner.length > 0 ? (
          allWinner.map((winner, index) => (
            <div
              className="showEachElection winnerAnimation"
              key={index}
              style={
                maxVote.current == winner.candidateVote
                  ? {
                      animation: "moveBackground 2s linear infinite",
                      height: "100px",
                      display: "visible",
                    }
                  : { height: "100px", display: "none" }
              }
            >
              <div className="intableOfWinner">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate ID</th>
                      <th>Candidate Name</th>
                      <th>Candidate Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{winner.candidateId}</td>
                      <td>{winner.candidateName}</td>
                      <td>{winner.candidateVote}</td>
                    </tr>
                  </tbody>
                </table>
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
        <h1>All Votes</h1>
        {allWinner.length > 0 ? (
          allWinner.map((winner, index) => (
            <div
              className="showEachElection"
              key={index}
              style={
                maxVote.current == winner.candidateVote
                  ? { height: "100px", display: "none" }
                  : { height: "100px", display: "visible" }
              }
            >
              <div className="intableOfWinner">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate ID</th>
                      <th>Candidate Name</th>
                      <th>Candidate Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{winner.candidateId}</td>
                      <td>{winner.candidateName}</td>
                      <td>{winner.candidateVote}</td>
                    </tr>
                  </tbody>
                </table>
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
