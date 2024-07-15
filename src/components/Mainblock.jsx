import React from "react";
import votingImage from "./voting.jpg";
// import "./Mainblock.css";

export default function Mainblock() {
  return (
    <div className="mainblock">
      <div className="image-container">
        <img src={votingImage} alt="Voting" className="image" />
      </div>
    </div>
  );
}
