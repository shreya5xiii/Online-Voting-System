import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateElectionComp({ setFormType, election }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: election,
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const object = {
        ...data,
        dbName: localStorage.getItem("loggedin_admin_email"),
        realElectionId: election.electionId,
      };
      console.log(object);
      let response = await fetch("http://localhost:8000/updateElection", {
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
      setFormType(0);
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
            setFormType(0);
          }}
        >
          {" "}
          <i className="fa fa-times"></i>
        </button>
        <form className="electionForm" onSubmit={handleSubmit(onSubmit)}>
          <h2>Update Election</h2>
          <div className="form-group">
            <label>Election ID</label>
            <input
              {...register("electionId")}
              type="text"
              className="form-control"
              placeholder="Enter Election ID"
              required
            />
          </div>
          <div className="form-group">
            <label>Election Title</label>
            <input
              {...register("electionTitle")}
              type="text"
              className="form-control"
              placeholder="Enter Election Title"
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              {...register("electionStartDate")}
              type="date"
              className="form-control"
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
