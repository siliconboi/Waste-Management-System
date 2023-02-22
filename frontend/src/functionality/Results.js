import React from 'react';
import './Results.css'
import { Link, useLocation } from "react-router-dom";

const Results=()=>{
    const { state } = useLocation();
    const { list,location,date } = state;
    console.log(list)

    return (<div className='containerall'>
        <div class="textcontainer">
            <h1 style={{fontSize:'50px'}}>Select scrap items for pickup</h1>
        <h6>Price may fluctuate because of the recycling library</h6>
        </div>
            <div className='cardcontainer'>
                {
            list.map((item,i)=>(
             <Link to="/finalpage" state={{ item:item, location:location, date:date }} className="link">
            <div className='card'>
                <h1 style={{fontSize:'30px'}}>{item.name}</h1>
                <h6 style={{fontSize:'18px'}}>{item.price?`₹${item.price}/kg`:`${item.credit} credits`}</h6>
                </div>
            </Link>
            ))
            }
            </div>
            </div>
    )
}

export default Results;

//span instead of div container 