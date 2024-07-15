
import React,{useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
export default function VoterPopUpForm({setcolName,setdatabasename,setshowForm}) {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const navigate = useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("voter_email")==null||  localStorage.getItem("voter_name")==null){
         navigate("/");
       }
      },[])
    const onSubmit=async(d)=>{
        try {
         const  voterEmail=localStorage.getItem("voter_email");
            fetch(`http://localhost:8000/getadminForVoter?adminEmail=${d.adminEmail}&&voterEmail=${voterEmail}&electionId=${d.electionId}`)
              .then((response) => {
                // console.log(response)
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                  return response.json();
               
                
               
              })
              .then((data) => {
              
                if(data[0]=="You have already voted"){
                  window.alert("You have already voted")
                }
                else if(data[0]=="Admin not exist"){
                  window.alert("Invalid Admin's email")
                }
                else if(data[0]=="Election not exist"){
                  window.alert("Election not exist")
                } else if(data=="Election not started yet"){
                  window.alert("Election not started yet")
                }
                else if(data[0]=="Election has been Ended"){
                 
                  setdatabasename( data[1][0]._id)
                  setcolName(d.electionId)
                  setshowForm(2)
                }else{
                    console.log(data)                
                    setdatabasename(data[0]._id)
                    setcolName(d.electionId)
                    setshowForm(1)
                }
               
              });
          } catch (error) {
            console.error("Error:", error);
             }
    }
  return (
    <div className='overlay' >
    <div className='popupDelete'>
      <button className='close-btn' onClick={() => { navigate("/"); localStorage.removeItem("voter_email");   localStorage.removeItem("voter_name");  }}> <i className="fa fa-times"></i></button>    
      <div className='deleteform'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h6 >Enter admin email</h6>
        <input
              {...register("electionId")}
              type="text"
              className="form-control"
              placeholder='Enter election id'
              required
            />
            <input
              {...register("adminEmail", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              type="text"
              className="form-control"
              placeholder='Enter admin Email'
              required
            />
        <button disabled={isSubmitting}>
         Search
        </button>
        </form>
        </div>  
    </div>
  </div>
  )
}

