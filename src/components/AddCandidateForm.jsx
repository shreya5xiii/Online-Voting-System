import React from "react";
import { useForm } from "react-hook-form";

export default function AddCandidateForm({ setpopForm, electionTit }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const object = {
        ...data,
        dbName: localStorage.getItem("loggedin_admin_email"),
        collectionNameOnElectionId: electionTit.electionId,
        electionTitle: electionTit.electionTitle,
      };
      console.log(object);
      fetch("http://localhost:8000/addCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data == "already exists") {
            window.alert("Candidate with this id or email is already exist");
          } else {
            setpopForm(0);
          }
        });
    } catch (error) {
      if (error.message === "Candidate already exists") {
        window.alert(
          "Candidate with this ID already exists. Please use a different ID."
        );
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <button
          className="close-btn"
          onClick={() => {
            setpopForm(0);
          }}
        >
          {" "}
          <i className="fa fa-times"></i>
        </button>
        <form className="candidateForm" onSubmit={handleSubmit(onSubmit)}>
          <h2>Add Candidate</h2>
          <div className="form-group">
            <label>Candidate ID</label>
            <input
              {...register("candidateId")}
              type="text"
              className="form-control"
              placeholder="Enter Candidate ID"
              required
            />
          </div>
          <div className="form-group">
            <label>Candidate Name</label>
            <input
              {...register("candidateName")}
              type="text"
              className="form-control"
              placeholder="Enter Candidate Title"
              required
            />
          </div>
          <div className="form-group">
            <label>Candidate Age</label>
            <input
              {...register("candidateAge")}
              type="number"
              className="form-control"
              placeholder="Enter Candidate Age"
              required
            />
          </div>

          <div className="form-group">
            <label>Candidate Email</label>
            <input
              {...register("candidateEmail", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="text"
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>

          <button disabled={isSubmitting} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
