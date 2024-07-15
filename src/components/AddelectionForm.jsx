import React from "react";
import { useForm } from "react-hook-form";

export default function AddelectionForm({ setFormType }) {
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
      };
      console.log(object);
      fetch("http://localhost:8000/addElection", {
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
            window.alert("Election with this  Id is already exist.");
          } else {
            setFormType(0);
          }
        });
    } catch (error) {
      console.error("Error:", error);
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
          <h2>Add Election</h2>
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
