import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar'; 
import 'boxicons/css/boxicons.min.css';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router-dom";

const Customersedit = (props) => {

  
  const history = useHistory()
  const [roleau, setroleau] = useState ('');
  const [productDetail, setproductDetail] = useState({})
  
  
  const { id } = useParams("");
      console.log(id);
  
  
  
      const getdata = async () => {
  
          const res = await fetch(`https://web-production-8ea2.up.railway.app/api/areaid/${id}`, {
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
          axios.patch(`https://web-production-8ea2.up.railway.app/api/areaupdate/${id}`,{
              areaName:productDetail.areaName,
              cemail:productDetail.cemail,
              caddress:productDetail.caddress,
              cmobile:productDetail.cmobile,
           
  
  },{
  headers,
  })
  
  .then((success)=>{
  console.log('success',success)
  alert("Customer Updated")
  history.push('/customers')
  })
  
  .catch((err)=>{
      console.log('error',err)
  
  })
  
  }
  


  return (
    <div className='flex flex-col md:flex-row bg-gray-200 min-h-screen'>
      <Sidebar />
      <div className="md:w-full md:max-w-md mx-auto my-10 md:my-auto bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <img className="w-full h-48 object-cover"
          src="https://as2.ftcdn.net/v2/jpg/05/75/00/85/1000_F_575008502_iL4EIHF2rUqNY2L1o45Q15Mny2j6Wn4W.jpg"
          alt="Card Image"/>
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-yellow-600 mb-4">Edit Customers</h2>
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Customer Name"
          value={productDetail.areaName}  onChange=  { (e)=>{setproductDetail({...productDetail, areaName: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Email" 
          
          value={productDetail.cemail}  onChange=  { (e)=>{setproductDetail({...productDetail, cemail: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Mobile"
           value={productDetail.cmobile}  onChange=  { (e)=>{setproductDetail({...productDetail, cmobile: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Address"
           value={productDetail.caddress}  onChange=  { (e)=>{setproductDetail({...productDetail, caddress: e.target.value})} }
          />
          <div className="mt-4">
            <button type='button' className='border-solid border-2 border-yellow-500 w-full md:w-40 my-5 rounded-full bg-yellow-500 text-white text-xl md:text-2xl hover:bg-white hover:text-yellow-500 p-1' onClick={()=>{updatePost()} }>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customersedit;