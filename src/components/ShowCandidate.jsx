import React, { useState, useEffect, useRef } from "react";

export default function ShowCandidate({
  electionTit,
  popForm,
  setpopForm,
  setcandidate,
}) {
  const [allcandidate, setallcandidate] = useState([]);
  const load = useRef([0]);
  useEffect(() => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    const collectionNameOnElectionId = electionTit.electionId;
    if (popForm == 0 && dbName) {
      fetch(
        `http://localhost:8000/ShowAllCandidate?dbName=${dbName}&collectionNameOnElectionId=${collectionNameOnElectionId}`
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
          setallcandidate(data);
        })
        .catch((error) => {
          console.error("Error fetching election data:", error);
        });
    }
  }, [popForm]);

  return (
    <div className="allcandidateCont">
      {allcandidate.length > 0 ? (
        allcandidate.map((candidate) => {
          return (
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
                <button
                  className="btn"
                  onClick={() => {
                    setcandidate(candidate);
                    setpopForm(2);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setcandidate(candidate);
                    setpopForm(3);
                  }}
                >
                  Delete
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
  );
}
