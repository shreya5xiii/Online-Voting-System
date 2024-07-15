import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function AdminLogin({ setadform }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (d) => {
    console.log(d);

    try {
      fetch(`http://localhost:8000/adminLogin?adminEmail=${d.adminEmail}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data[0].adminPassword == d.adminPassword) {
            localStorage.setItem("loggedin_admin_email", data[0]._id);
            localStorage.setItem("loggedin_admin_name", data[0].adminname);
            navigate("/admin");
          } else {
            window.alert(
              "Please Signup if already signup then fill correct info"
            );
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="adminformInner">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Admin Login</h1>

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

        <button disabled={isSubmitting} type="submit" className="btn">
          Login
        </button>

        <p>
          Please Signup if not have any account{" "}
          <a
            style={{ color: "green" }}
            onClick={() => {
              setadform(1);
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
