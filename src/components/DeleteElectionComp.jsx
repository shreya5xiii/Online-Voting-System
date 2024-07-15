import React from "react";

export default function DeleteElectionForm({ setFormType, election }) {
  const deleteElection = () => {
    const dbName = localStorage.getItem("loggedin_admin_email");
    const electionId = election.electionId;
    fetch(
      `http://localhost:8000/deleteElection?electionId=${electionId}&dbName=${dbName}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length != 0) {
          window.alert("election deleted successfully");
          location.reload();
        }
      })
      .catch((error) => {
        window.alert("election not exist or Network response is not ok ");
        location.reload();
      });
  };
  return (
    <div className="overlay">
      <div className="popupDelete">
        <button
          className="close-btn"
          onClick={() => {
            setFormType(0);
          }}
        >
          {" "}
          <i className="fa fa-times"></i>
        </button>
        <div className="deleteform">
          <h6>Do you really want to delete election</h6>

          <button onClick={deleteElection}>Delete</button>
        </div>
      </div>
    </div>
  );
}
