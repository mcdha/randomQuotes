import React, { useState } from 'react'
// import axios from 'axios';


function Trigger() {

  const [data, setData] = useState("");

  const fetchData = () => {
    fetch('https://dummyjson.com/quotes/random')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
    };

  return (
   <>
    
<div id='container' className='container-fluid'>
       
        <div className='container mt-5'>
            <h1 className='text-center'> " {data.quote} " </h1>
            <h3 className='text-center mt-5'> - {data.author} - </h3> 
            <h5 className='text-center mt-3'>{data.id}</h5>
        </div>
        <div className='mt-5 d-flex justify-content-center  hvr-underline-from-center hvr-bubble-float-top'>
            <button className='btn btn-dark justify-content-center d-flex mt-5' onClick={fetchData}>Random Quotes</button>
        </div>
</div>
        

        
    </>
     
     
    
  )
}

export default Trigger