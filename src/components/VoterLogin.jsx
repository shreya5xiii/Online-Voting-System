import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function VoterLogin({ setshowForm }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (d) => {
    console.log(d);

    try {
      fetch(`http://localhost:8000/voterLogin?voterEmail=${d.voterEmail}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            if (
              data[0].voterPassword != undefined &&
              data[0].voterPassword == d.voterPassword
            ) {
              localStorage.setItem("voter_email", d.voterEmail);
              localStorage.setItem("voter_name", data[0].votername);
              navigate("/voter");
            } else {
              window.alert("wrong password");
            }
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
    <div className="userformInner">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Voter Login</h1>

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

        <button disabled={isSubmitting} type="submit" className="btn">
          Login
        </button>

        <p>
          Please Signup if not have any account{" "}
          <a
            style={{ color: "green" }}
            onClick={() => {
              setshowForm(1);
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
