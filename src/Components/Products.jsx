import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar'; 
import 'boxicons/css/boxicons.min.css';

import {useHistory} from "react-router-dom";
import axios from 'axios';


const Products = (props) => {
  const history = useHistory()
  const [roleau, setroleau] = useState ('');
  const [userState, setUserState] = useState([0]);
  const [hotelname, sethotelname] = useState([]);
  const [categoryDetail, setcategoryDetail] = useState({
    
    categoryName: "",
   
  })

  const getdata = async () => {

    const findEmail2 = sessionStorage.getItem('user'); 


    const res = await fetch(`http://localhost:9000/api/allgetcategory`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    console.log(data);
    setUserState(data);
    getdata()    

}




const gethotelname = async () => {

    const findEmail = sessionStorage.getItem('user'); 
    console.log(findEmail)

    const res3 = await fetch(`http://localhost:9000/api/postbyemailsignup/${findEmail}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const hotel = await res3.json();
    sethotelname(hotel[0]?.hotelname);

  
}

sessionStorage.setItem('hotel', [hotelname])  
console.log(hotelname);

useEffect(()=>{
  getdata()
    gethotelname()
   
    
}, []);





      
  
  
  const addPost=()=>{
      
      if(!categoryDetail.categoryName.trim()){
          alert("Enter Product");
          }
      else{
  
          const headers = { "Content-Type": "application/json" };
          axios.post(`http://localhost:9000/api/allpostcategory`,{
              categoryName:categoryDetail.categoryName,
              userEmail: sessionStorage.getItem('user'),
              hotelname: sessionStorage.getItem('hotel'),
  },{
  headers,
  })
  
  .then((success)=>{
  console.log('success',success)
  alert("Prdouct Added")
  history.push('/products')
  })
  
  .catch((err)=>{
      console.log('error',err)
  
  })
  
  }
        
  }
  
///delelte single data

const deletedata = async (id) => {
  // http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/allpostdata

  const res2 = await fetch(`http://localhost:9000/api/deletecat/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
      
      
  });
alert("delete successfully")

  // const deletepost = await res2.json();
  // console.log(deletepost);
  // setUserState(deletepost);
  
  getdata()

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
          <h2 className="text-4xl font-bold text-yellow-600">Products</h2>
          <input
            className="input-field my-6 mx-3 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full"
            type="text"
            placeholder="Products Name"
            onChange=  { (e)=>{setcategoryDetail({...categoryDetail, categoryName: e.target.value})} }
          />
          <div className="mt-4 w-full md:w-auto">
            <button type='button' className='border-solid border-2 border-yellow-500 w-full md:w-40 my-5 rounded-full bg-yellow-500 text-white text-xl md:text-2xl hover:bg-white hover:text-yellow-500 p-1' onClick={()=>{addPost()} }>Save</button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">Product</th>
                 <th className="py-2 px-4 border-b text-center">Edit</th>
                <th className="py-2 px-4 border-b text-center">Delete</th>

              </tr>
            </thead>
            <tbody>

              
              {userState.map((item, id) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b text-center">{item._id}</td>
                  <td className="py-2 px-4 border-b text-center">{item.categoryName}</td>
              

                  <td className="py-2 px-4 border-b text-center">
                    <button type='button'>
                      
<a href={`Editcategory/${item._id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                      </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button type='button' className="bg-red-500 text-white py-2 px-1 rounded-2xl hover:bg-white hover:text-red-500 hover:border b-2 border-red-500" onClick={() => deletedata(item._id)}>Delete</button>
                  </td>
                 
                </tr>
              ))}

            </tbody>
          </table>
        </div>

              </div>
    </div>



  );
};

export default Products;
