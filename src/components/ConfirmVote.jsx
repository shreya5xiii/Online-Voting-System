import React from 'react'

export default function ConfirmVote({setshowForm,candidate,setshowconfirm,colName,databasename}) {
  const increaseVote=async()=>{
console.log(colName)
console.log(databasename)
console.log(candidate)
try {
  const object = {
   
    colName: colName,
    databasename:databasename,
    candidateId:candidate.candidateId,
    candidateVote:candidate.candidateVote,
    voterEmail:localStorage.getItem("voter_email"),
    votername:localStorage.getItem("voter_name")
  };
  console.log(object);
  let response = await fetch("http://localhost:8000/increaseVote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  }) .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data)=>{
    console.log(data)
    setshowForm(0)
    

  })
 
} catch (error) {

    console.error("Error:", error);
  
}
  }
  console.log("bye")
  return (
    <div className='overlay' >
    <div className='popupDelete'>
      <button className='close-btn' onClick={() => { setshowconfirm(0)  }}> <i className="fa fa-times"></i></button>    
      <div className='deleteform'>
           <h3>Once you vote,you can not cange it. </h3>
           <button className='btn' onClick={increaseVote}>Vote</button>
        </div>  
    </div>
  </div>
  )
}
