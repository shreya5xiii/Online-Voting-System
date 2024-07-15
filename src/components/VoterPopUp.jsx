import React, { useState } from 'react'
import VoterPopUpForm from './VoterPopUpForm'
import ConfirmVote from './ConfirmVote'
import Voter from './Voter'
import ResultForVoter from './ResultForVoter'
export default function VoterPopUp() {
    const [showForm,setshowForm]=useState(0)
    const [databasename,setdatabasename]=useState()
    const [colName,setcolName]=useState()
  const returnPage=()=>{
    switch(showForm){
        case 1:
            return <Voter setshowForm={setshowForm} colName={colName} showForm={showForm} databasename={databasename}/>
        case 2:
            return <ResultForVoter  setshowForm={setshowForm} colName={colName} showForm={showForm} databasename={databasename}/>        
        default:
            return < VoterPopUpForm  setcolName={setcolName} setdatabasename={setdatabasename} setshowForm={setshowForm}/>
    }
  }
  return (
    <div>
      {returnPage()}
    </div>
  )
}
