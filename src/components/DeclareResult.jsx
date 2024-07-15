import React,{useState,useRef} from 'react'
import WinnerComp from './WinnerComp';
import ShowElectionForDeclareResult from './ShowElectionForDeclareResult';
export default function ViewScore({elem}) {
const [showWinnerComp,setshowWinnerComp]=useState(0);
const election=useRef()
const returnComponent=()=>{
switch (showWinnerComp) {
  case 1:
    return <WinnerComp showWinnerComp={showWinnerComp} election={election.current} setshowWinnerComp={setshowWinnerComp} />
  default:
   return <ShowElectionForDeclareResult election={election} elem={elem} setshowWinnerComp={setshowWinnerComp}/>
}
}
  return (   
    <div className='addelectionContainer' >
      {returnComponent()}     
    </div> 
  )
}
