import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar'; 
import 'boxicons/css/boxicons.min.css';
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {useParams} from 'react-router-dom';

const Productedit = (props) => {


  const history = useHistory()
  const [roleau, setroleau] = useState ('');
  const [productDetail, setproductDetail] = useState({})
  
  
  const { id } = useParams("");
      console.log(id);
  
  
  
      const getdata = async () => {
  
          const res = await fetch(`https://web-production-8ea2.up.railway.app/api/catid/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          const data = await res.json();
          console.log(data);
  
     if (res.status === 422 || !data) {
    console.log("error ");
  
  } else {
      setproductDetail(data)
  
  
  console.log("get data");
  
   }
      }
  
      const getrole=()=>{
  
          let roleuser = sessionStorage.getItem('role');
        
          setroleau(roleuser);
          console.log(roleau, 'roleg')
        
        }
        
  
      useEffect(() => {
          getdata();
          getrole();
      }, []);
  
  
  
  
  
  
  
  
  const updatePost=()=>{
      
  
          const headers = { "Content-Type": "application/json" };
          axios.patch(`https://web-production-8ea2.up.railway.app/api/catupdate/${id}`,{
              categoryName:productDetail.categoryName,
           
  
  },{
  headers,
  })
  
  .then((success)=>{
  console.log('success',success)
  alert("products updated")
  history.push('/products')
 
  })
  
  .catch((err)=>{
      console.log('error',err)
  
  })
  
  }
  


  return (
    <div className='bg-gray-200 min-h-screen flex flex-col md:flex-row justify-center'>
      <Sidebar />        

      <div className="max-w-md mx-auto my-10 md:my-20 bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto">
        <img
          className="w-full h-48 object-cover"
          src="https://miro.medium.com/v2/resize:fit:1000/1*yBCqCxrIYQgC8cfEF1JxUA.png"
          alt="Card Image"
        />
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-yellow-600">Edit Products</h2>
          <input
            className="input-field my-6 mx-3 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full"
            type="text"
            placeholder="Products Name"
            value={productDetail.categoryName}  onChange=  { (e)=>{setproductDetail({...productDetail, categoryName: e.target.value})} }
          />
          <div className="mt-4 w-full md:w-auto">
            <button type='button' className='border-solid border-2 border-yellow-500 w-full md:w-40 my-5 rounded-full bg-yellow-500 text-white text-xl md:text-2xl hover:bg-white hover:text-yellow-500 p-1' onClick={()=>{updatePost()} }>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productedit;
