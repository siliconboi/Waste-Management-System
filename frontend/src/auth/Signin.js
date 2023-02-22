import './Signin.css'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

export default function Signin({setToken}) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate(); 
  const changeRoute = ()=>{
    let path = `/signup`; 
    navigate(path);
    }

  const verified = ()=>{
    let path = `/collect`; 
    navigate(path);
    }

        async function requestSignin(){
        const data ={
        name: name,
        password: password
        }
            const res = await fetch("http://localhost:8080/user/api/signin", {
                method:"POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
           const json= await res.json();
          sessionStorage.setItem("jwt",json.token)
          console.log(sessionStorage.getItem("jwt"))
          setToken(json.token)
          verified();
        };

return(
    <div className="signin">
      <form
      onSubmit={e=>{
        e.preventDefault()
        requestSignin()
      }}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
          <button type="button" onClick={changeRoute}>Signup</button>
    </div>
  )
  }

  
Signin.propTypes = {
  setToken: PropTypes.func.isRequired
}