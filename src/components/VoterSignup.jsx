import React from "react";
import { useForm } from "react-hook-form";
export default function VoterSignup({ setshowForm }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (d) => {
    try {
      console.log(d);
      let response = await fetch("http://localhost:8000/voterSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let res = await response.json();
      console.log(res);
      setshowForm(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="adminformInner">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Voter Sign Up</h1>
        <div className="form-group">
          <label>Voter Name</label>
          <input
            {...register("votername")}
            type="text"
            className="form-control "
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Voter Email</label>
          <input
            {...register("voterEmail", {
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
            {...register("voterPassword", {
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
              setshowForm(0);
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
