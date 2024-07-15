import React from "react";
import Navbar from "./Navcomponent";
import Mainheading from "./Mainheading";
import Mainblock from "./Mainblock";
import Adminblock from "./Adminblock";
import Userblock from "./Userblock";
export default function Welcome() {
  return (
    <>
      <Navbar />
      <Mainheading />
      <Mainblock />
      <Adminblock />
      <Userblock />
    </>
  );
}
