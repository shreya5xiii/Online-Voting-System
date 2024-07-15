import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function AdminSignup({ setadform }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (d) => {
    try {
      console.log(d);
      let response = await fetch("http://localhost:8000/adminSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setadform(0);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="adminformInner">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Admin Sign Up</h1>
        <div className="form-group">
          <label>Admin Name</label>
          <input
            {...register("adminname")}
            type="text"
            className="form-control "
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Admin Email</label>
          <input
            {...register("adminEmail", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            className="form-control "
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            {...register("adminPassword", {
              minLength: { value: 6, message: "Min length is 6" },
            })}
            type="password"
            className="form-control "
            placeholder="Enter password"
            required
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="btn"
          style={{ marginTop: "0px", marginBottom: "10px" }}
        >
          Sign Up
        </button>

        <p>
          Login instead
          <a
            style={{ color: "green" }}
            onClick={() => {
              setadform(0);
            }}
          >
            {" "}
            Click here
          </a>
        </p>
      </form>
    </div>
  );
}
