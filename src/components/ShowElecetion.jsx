import React, { useEffect, useState, useRef } from "react";
export default function ShowElection({
  formType,
  setFormType,
  setSelectedElection,
}) {
  const [allElection, setAllElection] = useState([]);
  const load = useRef([0]);

  useEffect(() => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    if (formType == 0 && dbName) {
      fetch(`http://localhost:8000/ShowAllElection?dbName=${dbName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          load.current = data;
          setAllElection(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    } else {
      console.log("Waiting");
    }
  }, [formType]);

  const updateElection = (election) => {
    setSelectedElection(election);
    setFormType(2);
  };
  const deleteElection = (election) => {
    setSelectedElection(election);
    setFormType(3);
  };

  return (
    <div className="showAllElection">
      {allElection.length > 0 ? (
        allElection.map((election, index) => (
          <div className="showEachElection" key={index}>
            <div className="intable">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>Result</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{election.electionId}</td>
                    <td>{election.electionTitle}</td>
                    <td>{election.electionStartDate}</td>
                    <td>
                      {election.electionWinner == ""
                        ? "Not Declare"
                        : "Declared"}
                    </td>
                    <td>
                      {election.electionEndDate == ""
                        ? "-"
                        : election.electionEndDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="allbtn">
              {election.electionEndDate == "" && (
                <button
                  className="btn"
                  onClick={() => updateElection(election)}
                >
                  Update
                </button>
              )}
              <button className="btn" onClick={() => deleteElection(election)}>
                Delete
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
  );
}
