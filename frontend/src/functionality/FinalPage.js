import './FinalPage.css'
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const FinalPage=()=>{
  const ckik = useLocation();
  const item= ckik.state.item;
  const location= ckik.state.location;
  const date= ckik.state.date;
  console.log(item)
  useEffect(()=>{
    postPickup();
    requestCredits();
    },[])
let token = sessionStorage.getItem("jwt");

async function postPickup(){
const data ={
item: item,
location:location,
date: date
    }
    const res = await fetch(`http://localhost:8080/api/post`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "authentication": token,
            'Content-Type': "application/json"
        }
    })
    const json = await res.json()
    console.log(json)
}
    const [credits,setCredits]=useState(0);
    let credit;

    async function requestCredits(){
        credit = await fetch('http://localhost:8080/api/credits',{
          method:"GET",
          headers:{
          "authentication": sessionStorage.getItem("jwt")
          }
        });
        const json = await credit.json();
           setCredits(json);
           console.log(credits)
    }
return(
<div className="thank-you">
  <div className="thank-you1">thank you!</div>
  <div className="your-request-has-container">
    <span className="your">{`your `}</span>
    <span className="request-has-been">request has been accepted.</span>
  </div>
  <div className="zero-point">
    <div className="zero-point-child" >
    <div className="you-earned-5">{item.credit?`you earned ${item.credit} credit coins`:``}</div>
    <div className="your-total-coins">you have a total {credits} coins</div>
    <button className="button">
      <div className="sign-up">know more</div>
    </button>
    </div>
  </div>
</div>
)
}

export default FinalPage;