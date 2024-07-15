import React from "react";

export default function DeleteCandidateForm({
  electionTit,
  setpopForm,
  candidate,
}) {
  const deleteElection = () => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    const collectionNameOnElectionId = electionTit.electionId;
    const candidateId = candidate.candidateId;
    fetch(
      `http://localhost:8000/deleteCandidate?collectionNameOnElectionId=${collectionNameOnElectionId}&dbName=${dbName}&candidateId=${candidateId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length != 0) {
          window.alert("candidate deleted successfully");
        }
      })
      .catch((error) => {
        window.alert("candidate not exist or Network response is not ok ");
        location.reload();
      });
  };
  return (
    <div className="overlay">
      <div className="popupDelete">
        <button
          className="close-btn"
          onClick={() => {
            setpopForm(0);
          }}
        >
          {" "}
          <i className="fa fa-times"></i>
        </button>
        <div className="deleteform">
          <h6>Do you really want to delete candidate</h6>

          <button onClick={deleteElection}>Delete</button>
        </div>
      </div>
    </div>
  );
}
