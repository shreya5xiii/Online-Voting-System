import React, { useState } from "react";
import VoterLogin from "./VoterLogin";
import VoterSignup from "./VoterSignup";

export default function Userblock() {
  const [showForm, setshowForm] = useState(0);
  const returnForm = () => {
    switch (showForm) {
      case 0:
        return <VoterLogin setshowForm={setshowForm} />;
      case 1:
        return <VoterSignup setshowForm={setshowForm} />;
      default:
        return <VoterLogin setshowForm={setshowForm} />;
    }
  };
  return (
    <>
      <div className="adminblock">
        <div className="container adminform">{returnForm()}</div>
        <div className="container adminheading">
          <h1>Voter</h1>
          <p>
            Authorized Voter can do following tasks. <br></br>- Voter need to
            know the Election ID and Admin Email. <br></br>- Voter can give vote
            to any of the candidate of his choice<br></br>- Voter can vote only
            once <br></br>- Voter can not vote again for same election.{" "}
            <br></br>- If the election is ended then Voter can see the result of
            respective election.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
