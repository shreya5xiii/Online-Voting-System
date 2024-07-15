import React, { useState, useRef } from "react";
import HistoryComp from "./HistoryComp";
import ShowElectionForHistory from "./ShowElectionForHistory";
export default function ElectionHistory({ elem }) {
  const [showHistoryComp, setshowHistoryComp] = useState(0);
  const election = useRef();
  const returnComponent = () => {
    switch (showHistoryComp) {
      case 1:
        return (
          <HistoryComp
            showHistoryComp={showHistoryComp}
            election={election.current}
            setshowHistoryComp={setshowHistoryComp}
          />
        );
      default:
        return (
          <ShowElectionForHistory
            election={election}
            elem={elem}
            setshowHistoryComp={setshowHistoryComp}
          />
        );
    }
  };
  return <div className="addelectionContainer">{returnComponent()}</div>;
}
