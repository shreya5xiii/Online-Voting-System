import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateCandidateForm({
  electionTit,
  setpopForm,
  candidate,
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: candidate,
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const object = {
        ...data,
        dbName: localStorage.getItem("loggedin_admin_email"),
        realCandidateId: candidate.candidateId,
        collectionNameOnElectionId: electionTit.electionId,
      };
      console.log(object);
      let response = await fetch("http://localhost:8000/updateCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Election already exists");
        }
        throw new Error("Network response was not ok");
      }
      let res = await response.json();
      console.log(res);
      setpopForm(0);
    } catch (error) {
      if (error.message === "Election already exists") {
        window.alert(
          "Election with this ID already exists. Please use a different ID."
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
          <h2>Update Candidate</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
