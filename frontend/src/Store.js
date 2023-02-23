import { useEffect, useState } from "react";

const Store = ()=>{
    const [credits,setCredits]=useState(0)
    useEffect(()=>{
    requestCredits();
    },[])
    async function requestCredits(){
        const credit = await fetch('https://waste-management-app-fzkv.onrender.com/api/credits',{
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
        <div className="containerstore">
            <div className="storename">ZERO Store</div>
<div className="scorecard"> Coins available{credits}</div>
<div>Redeem coins for exciting products or discount vouchers</div>
<div className="productcontainer">
    <div>
        <img></img>
    </div>
    <div>
        <img></img>
    </div>
    <div>
        <img></img>
    </div>
    <div>
        <img></img>
    </div>
    <div>
        <img></img>
    </div>
</div>
</div>
    )
}
export default Store;