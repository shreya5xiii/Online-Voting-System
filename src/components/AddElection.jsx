import React, { useState } from "react";
import AddelectionForm from "./AddelectionForm";
import ShowElection from "./ShowElecetion";
import UpdateElectionComp from "./UpdateElectionComp";
import DeleteElectionComp from "./DeleteElectionComp";
export default function AddElection() {
  const [formType, setFormType] = useState(0);
  const [selectedElection, setSelectedElection] = useState({});

  const returnForm = () => {
    switch (formType) {
      case 1:
        return <AddelectionForm setFormType={setFormType} />;
      case 2:
        return (
          <UpdateElectionComp
            setFormType={setFormType}
            election={selectedElection}
          />
        );
      case 3:
        return (
          <DeleteElectionComp
            setFormType={setFormType}
            election={selectedElection}
          />
        );
      default:
        return <div></div>;
    }
  };

  const addElection = () => {
    setFormType(1);
  };

  return (
    <div className="addelectionContainer">
      <div className="addelemctionNav">
        <button className="btn" onClick={addElection}>
          Add Election
        </button>
      </div>
      <div className="addelectionForm">{returnForm()}</div>
      <div>
        <ShowElection
          formType={formType}
          setFormType={setFormType}
          setSelectedElection={setSelectedElection}
        />
      </div>
    </div>
  );
}
