import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({props})=>{
    const { item = 'defaultValue', location='defaultValue', date='defaultValue' } = props.state || {};
    useEffect(()=>{
    postPickup();
    },[])
let token = sessionStorage.getItem("jwt");
    let navigate = useNavigate(); 
    const changeRoute = ()=>{
      let path = `/finalpage`; 
      navigate(path);
      }

async function postPickup(){
const data ={
item: item,
location:location,
date: date
    }
    await fetch(`http://localhost:8080/api/post`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "authentication": token,
            'Content-Type': "application/json"
        }
    })
changeRoute()
}

    return(
        <div>
            <form onSubmit={e=>{
                e.preventDefault()
                postPickup()
            }
            }>
            <fieldset>
  <legend>Choose your Payment method</legend>
  <div>
    <input type="checkbox" id="upi" name="interest" value="upi" />
    <label for="upi">UPI</label>
  </div>
  <div>
    <input type="checkbox" id="nbank" name="interest" value="nbank" />
    <label for="nbank">Net Banking</label>
  </div>
  <div>
    <input type="checkbox" id="cash on delivery" name="interest" value="cash on delivery" />
    <label for="cash on delivery">Cash On Delivery</label>
  </div>
</fieldset>
<button type="submit">Book Pickup</button>
            </form>
        </div>
    )
}  

export default Payment;