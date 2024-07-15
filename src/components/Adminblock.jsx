import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";
export default function Adminblock() {
  const [adform, setadform] = useState(0);
  const returnform = () => {
    switch (adform) {
      case 0:
        return <AdminLogin setadform={setadform} />;
      case 1:
        return <AdminSignup setadform={setadform} />;
      default:
        return <AdminLogin setadform={setadform} />;
    }
  };

  return (
    <>
      <div className="adminblock">
        <div className="container adminheading">
          <h1>Admin</h1>
          <p>
            An outhorized Admin can do the following tasks <br></br> -Admin can
            Organize an election.<br></br> -Admin can add the candidates for
            respective election.<br></br> -Admin can declare the result of an
            election.<br></br> -Admin can see the completed elctions and their
            respective results.
          </p>
        </div>
        <div className="container adminform">{returnform()}</div>
      </div>
    </>
  );
}
