import './Signin.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';

export default function Signup() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [authenticated, setAuthenticated] =useState(false)
const [checkpassword, setCheckpassword] = useState("")

let navigate = useNavigate(); 
const changeRoute = ()=>{
  let path = `/signin`; 
  navigate(path);
  }
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("jwt");
    if (loggedInUser) {
    setAuthenticated(loggedInUser);
    }
    }, []);

function matchPass(){
    if(password===checkpassword)return false;
    return true;
}

useEffect(()=>{
    requestSignup();
},[])

    async function requestSignup(){
const data ={
name: name,
email: email,
password: password
}
        const res = await fetch("http://localhost:8080/user/api/signup", {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
       const json= await res.json(); 
       console.log(json.token)
      sessionStorage.setItem("jwt",json.token)
      setAuthenticated(true)
      };
if(authenticated){
return <Navigate  replace to="/collect" />
}
else{return(  
    <div className="signup">
      <form
      onSubmit={e=>{
      e.preventDefault()
    requestSignup()
    }
       }>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="password" onChange={(e)=>setCheckpassword(e.target.value) }/>
        </label>
        <div>
          <button type="submit" disabled={matchPass()}>Signup</button>
        </div>
      </form>
          <button type="button" onClick={changeRoute}>Signin</button>
    </div>
  )
}
}