import React, { useState } from "react";
import AddCandidateForm from "./AddCandidateForm";
import UpdateCandidateForm from "./UpdateCandidateForm";
import DeleteCandidateForm from "./DeleteCandidateForm";
import ShowCandidate from "./ShowCandidate";
export default function AddCandidate({ electionTit ,setElem}) {
  const [popForm, setpopForm] = useState(0);
  const [candidate, setcandidate] = useState({});
  const returnPopForm = () => {
    switch (popForm) {
      case 1:
        return (
          <AddCandidateForm
            electionTit={electionTit}
            setpopForm={setpopForm}
            setcandidate={setcandidate}
          />
        );
      case 2:
        return (
          <UpdateCandidateForm
            electionTit={electionTit}
            setpopForm={setpopForm}
            candidate={candidate}
          />
        );
      case 3:
        return (
          <DeleteCandidateForm
            electionTit={electionTit}
            setpopForm={setpopForm}
            candidate={candidate}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="addcandidateContainer">
      <div className="addcandidateNav" style={{display:""}}>
      <i className="fa fa-arrow-left" onClick={()=>setElem(1)} style={{float:"left",margin:"30px 10px" , fontSize:"40px"}}></i>
      
        <button className="btn" onClick={() => setpopForm(1)}>
          Add Candidate
        </button>
      </div>
      <div className="addelectionForm">{returnPopForm()}</div>
      <ShowCandidate
        electionTit={electionTit}
        popForm={popForm}
        setpopForm={setpopForm}
        setcandidate={setcandidate}
      />
    </div>
  );
}
