import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar'; 
import 'boxicons/css/boxicons.min.css';
import {useHistory} from "react-router-dom";
import axios from 'axios';

const Customers = (props) => {

const history = useHistory()
const [userState, setUserState] = useState([]);
const [hotelname, sethotelname] = useState([]);
const [useremail, setuserEmail] = useState([]);
const [roleau, setroleau] = useState ('');
const [area, setArea] = useState({
  
    areaName: "",
    cmobile:"",
    caddress:"",
    cemail:""


})

const addPost=()=>{
    
  if(!area.areaName.trim()){
      alert("Enter Customer Name");
      }
  else{

      const headers = { "Content-Type": "application/json" };
      axios.post(`https://web-production-8ea2.up.railway.app/api/allpostarea`,{
          areaName:area.areaName,
          cemail:area.cemail,
          caddress:area.caddress,
          cmobile:area.cmobile,
          userEmail: sessionStorage.getItem('user'),
          hotelname: sessionStorage.getItem('hotel'),
},{
headers,
})

.then((success)=>{
console.log('success',success)
alert("customer added")
history.push('/customers')
getdata()
})

.catch((err)=>{
  console.log('error',err)

})

}
    
}

const getdata = async () => {

  const findEmail2 = sessionStorage.getItem('user'); 
  // http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/allpostdata

  // `http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/postbyemail/${useremail}`

  // https://web-production-d8bb8.up.railway.app/api/allpostdata

  const res = await fetch(`https://web-production-8ea2.up.railway.app/api/allgetarea`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
      
  });

  const data = await res.json();
  console.log(data, 'data');
  setUserState(data);    

}


const gethotelname = async () => {
  // http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/allpostdata

  // `http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/postbyemail/${useremail}`
  const findEmail = sessionStorage.getItem('user'); 
  console.log(findEmail)

  const res3 = await fetch(`https://web-production-8ea2.up.railway.app/api/postbyemailsignup/${findEmail}`,{
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

  gethotelname()
  
}, []);


const getrole=()=>{

  let roleuser = sessionStorage.getItem('role');

  setroleau(roleuser);
  console.log(roleau, 'roleg')

}


useEffect(()=>{
  const udata = sessionStorage.getItem('user');    
  setuserEmail(udata); 
  
  getdata()



  

}, []);

const updatePost=(id)=>{
    

  const headers = { "Content-Type": "application/json" };
  axios.patch(`https://web-production-8ea2.up.railway.app/api/areaupdate/${id}`,{

        
    


},{
headers,
})

.then((success)=>{
console.log('success',success)
getdata()

})

.catch((err)=>{
console.log('error',err)

})

}


///delelte single data

const deletedata = async (id) => {
// http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/allpostdata

const res2 = await fetch(`https://web-production-8ea2.up.railway.app/api/deletearea/${id}`, {
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
    <div className='flex flex-col md:flex-row bg-gray-200 min-h-screen'>
      <Sidebar />
      <div className="md:w-full md:max-w-md mx-auto my-10 md:my-auto bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        <img className="w-full h-48 object-cover"
          src="https://as2.ftcdn.net/v2/jpg/05/75/00/85/1000_F_575008502_iL4EIHF2rUqNY2L1o45Q15Mny2j6Wn4W.jpg"
          alt="Card Image"/>
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-yellow-600 mb-4">Customers</h2>
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Customer Name"
          onChange=  { (e)=>{setArea({...area, areaName: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Email" 
          onChange=  { (e)=>{setArea({...area, cemail: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Mobile"
          onChange=  { (e)=>{setArea({...area, cmobile: e.target.value})} }
          />
          <input className="input-field my-2 mx-2 md:mx-10 border-b pl-2 md:pl-10 text-center text-xl md:text-2xl w-full" type="text" placeholder="Address"
          onChange=  { (e)=>{setArea({...area, caddress: e.target.value})} }
          />
          <div className="mt-4">
            <button type='button' className='border-solid border-2 border-yellow-500 w-full md:w-40 my-5 rounded-full bg-yellow-500 text-white text-xl md:text-2xl hover:bg-white hover:text-yellow-500 p-1' onClick={()=>{addPost()} }>Add</button>
          </div>
        </div>

    {/* Reports Table */}
    <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">ID</th>
                <th className="py-2 px-4 border-b text-center">Customer</th>
                 <th className="py-2 px-4 border-b text-center">Edit</th>
                <th className="py-2 px-4 border-b text-center">Delete</th>

              </tr>
            </thead>
            <tbody>

              
              {userState.map((item, id) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b text-center">{item._id}</td>
                  <td className="py-2 px-4 border-b text-center">{item.areaName}</td>
              

                  <td className="py-2 px-4 border-b text-center">
                    <button type='button'>
                      
          <a href={`Editcustomer/${item._id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

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

export default Customers;