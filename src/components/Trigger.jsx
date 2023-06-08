import React, { useState } from 'react'
// import axios from 'axios';


function Trigger() {

    const [data, setData] = useState("");

  const fetchData = () => {
    fetch('https://dummyjson.com/quotes/random')
    // fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
    };

    // const fetchData1 = () => {
    //     fetch('https://dog.ceo/api/breeds/image/random')
    //       .then(response => response.json())
    //       .then(data => {
    //         setData(data);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //     };

  return (
   <>
 {/* button.addEventListener("click", function() {
      Swal.fire({
        data: {data.author},
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
}); */}
    
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