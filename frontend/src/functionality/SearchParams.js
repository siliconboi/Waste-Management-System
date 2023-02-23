import React from 'react';
import "./SearchParams.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import useToken from '../auth/useToken';
import Signin from '../auth/Signin';


const SearchParams = () => {
  const [location, updateLocation] = useState("");
  const [date, setDate] = useState(Date.now());
  const [imageUrl, setImageUrl] = useState("");
  const [list, updateList] = useState([]);
  const [enter, setEnter] = useState(false);
  const {token, setToken} = useToken();
 
const updateDate= async(date)=>{
  const from = date.split("-")
  const f = new Date(from[2], from[1] - 1, from[0])
  setDate(f);
}

let navigate = useNavigate();
const changeRoute = ()=>{
  if(enter){

    let path = `/collecttype`;
    navigate(
      path,
      {
        state: {
          
          list:list,
          location:location,
          date: date
        }
      }
      )
    }
  }
  useEffect(()=>{
    changeRoute();
  },[enter])

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const url = event.target.result;
      setImageUrl(url);
    };
  };  


  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:8080/api/check`, {
      method: "POST",
      body:JSON.stringify({
        image:imageUrl
      }),
      headers:{
        "Content-Type": "application/json",
        "authentication": token
      }
    })
    const listf = await res.json();
    updateList(listf);
    setEnter(true);
    console.log(list)
  };

  if (!token) {//change to !authenticated
    return <Signin setToken={setToken} />;
    }
    else{
      return (
        <div className="search-params">
          <form
         onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
         }}
         >
          <div className="collector1">
          <div className="inputtable">
         <label htmlFor="location">
          Location
          <input
            id="location"
            className="location"
            value={location}
            placeholder="Search"
            icon={<AiOutlineSearch/>}
            onChange={(e) => updateLocation(e.target.value)}
            />
         </label>
         <label htmlFor="date">
          Date
          <input
            id="date"
            type="date"
            className="date"
            placeholder="Choose"
            onChange={(e) => updateDate(e.target.value)}
            />
         </label>
         <label htmlFor="file">
          Upload Scrap Item's Picture
          <input type="file" className="uploadfile" accept="image/*" capture="environment" id="image" onChange={
            handleFileSelect
          }/>
          
         </label>
          </div>
          <div className="buttontable">
            <div className="collect1content"><h1>Provide your information</h1></div>
            <button type="submit">Raise pickup request</button>
          </div>
          </div>
      </form>
     </div>
  );
}
};

export default SearchParams;