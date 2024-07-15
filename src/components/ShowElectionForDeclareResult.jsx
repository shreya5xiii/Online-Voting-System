import React, { useState, useEffect, useRef } from "react";

export default function ShowElectionForDeclareResult({
  election,
  setshowWinnerComp,
  elem,
}) {
  const [allelection, setallelection] = useState([]);
  const load = useRef([0]);

  useEffect(() => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    if (elem === 2) {
      fetch(
        `http://localhost:8000/ShowElectionForDeclareResult?dbName=${dbName}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          load.current = data;
          console.log(data);
          setallelection(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    }
  }, [elem]);

  const declare = (electionData) => {
    election.current = electionData;
    setshowWinnerComp(1);
  };

  return (
    <div className="addelectionContainer">
      <div
        className="addelemctionNav"
        style={{ textAlign: "center", paddingTop: "20px" }}
      >
        <h1>Currently running elections</h1>
      </div>
      <div className="allcandidateCont">
        {allelection.length > 0 ? (
          allelection.map((election) => {
            return (
              <div key={election.electionId} className="eachCandidate">
                <table>
                  <tbody>
                    <tr>
                      <th>Election ID</th>
                      <td>{election.electionId}</td>
                    </tr>
                    <tr>
                      <th>Election Title</th>
                      <td>{election.electionTitle}</td>
                    </tr>
                    <tr>
                      <th>Start Date</th>
                      <td>{election.electionStartDate}</td>
                    </tr>
                    <tr>
                      <th>Total Voters</th>
                      <td>{election.voterCount}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="allbtn">
                  <button className="btn" onClick={() => declare(election)}>
                    Declare Result
                  </button>
                </div>
              </div>
            );
          })
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
