
import React, {useState, useEffect} from 'react'
import {useHistory,useLocation} from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import yourImage from '../images/img.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


export default function Login(props) {


    
    const [userRole, setRole] = useState([""]);

    const [userContact, setuserContact] = useState([""]);

    const [userAddress, setuserAddress] = useState([""]);

    const [userMarket, setuserMarket] = useState([""]);
    const [userArea, setuserArea] = useState([""]);

    const [accountStatus, setAccountStatus] = useState([""]);
    const dispatch = useDispatch();
    const [data,setData] = useState({

      email: "",
      password: ""

    });




    

    const history = useHistory()

    const loginc =()=>{

        if(!data.email.trim()){
            alert("Enter Email");
            }
            else if(!data.password.trim()){
                alert("Enter password");
            }
                else if(data.message === 'Password Incorrect!'){
                    // console.log(response.data.message)
                    // alert(response.data.message);
                

                }else{
 
            const headers = { "Content-Type": "application/json" };
            axios.post(`http://localhost:9000/api/signin`,{
                
                email:data.email,
                password:data.password
},{
    headers,
  })

  .then((success)=>{
    console.log('success',success)
  
    sessionStorage.setItem('token', 'thisismytoken')
    sessionStorage.setItem('user', data.email)
    

    sessionStorage.setItem('role', [userRole]) 

   const roleua = sessionStorage.getItem('role')


if (roleua === 'Admin'){

    history.push('/Welcome')

}


    
    




  }) 

    .catch((err)=>{
        alert("Something Went Wrong")
        console.log('error',err)
    
    })

    }
  
    }       
    
    
    


/////get email with role

const getrole = async () => {
    


    const res3 = await fetch(`http://localhost:9000/api/postbyemailsignup/${data.email}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });


   
    const role = await res3.json();



    setRole(role[0]?.role);

    // setuserContact(role[0]?.contact);
    // setuserAddress(role[0]?.address);

    // setuserArea(role[0]?.area);
    // setuserMarket(role[0]?.marketname);
    setAccountStatus(role[0]?.accountsstatus)

    console.log(accountStatus, 'status')

    sessionStorage.setItem('role', [userRole])

    sessionStorage.setItem('accountstatus', [accountStatus])

    // sessionStorage.setItem('contact', [userContact])
    // sessionStorage.setItem('address', [userAddress])

    // sessionStorage.setItem('area', [userArea])
    // sessionStorage.setItem('market', [userMarket])

}

 


///// end    

    
    
      useEffect(() =>{

       const getdata = sessionStorage.getItem('token');

       const roleua2 = sessionStorage.getItem('role');

       const roleua3 = sessionStorage.getItem('accountstatus');




       if (!roleua2){
           history.push('/login')
       }

 
    else if (roleua2 === 'Admin'){
    
        history.push('/Welcome')

    }
    

       
       
    },[]);









  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl text-gray-400 mb-10 ">Login Form</h1>

      <div className="lg:flex lg:w-3/4 rounded-xl bg-white shadow-md overflow-hidden">
        <div className="lg:w-1/2">
          <img className="w-full h-auto object-cover" src={yourImage} alt="Background" />
        </div>
        <div className="lg:w-1/2 p-8">
          <form className="flex flex-col items-center">
            <h2 className="text-3xl mb-4 text-yellow-500 py-3 font-sans">Member Login</h2>

            <div className="relative">
              <i className="bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                className="input-field my-3 border-b pl-10 text-center"
                type="text"
                placeholder="Enter your Email"
                onKeyPress={getrole} onChange={e => setData({...data,  email: e.target.value})}
              />
            </div>

            <div className="relative">
              <i className="bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                className="input-field my-3 border-b pl-10 text-center"
                type="password"
                placeholder="Enter Your Password"
                onKeyPress ={getrole}  onChange={ (e)=> {setData({...data, password: e.target.value})} }
              />
            </div>

            <button type = "button" className='border-solid border-2 border-yellow-500 w-40 my-5 rounded-full bg-yellow-500 text-white text-2xl hover:bg-white hover:text-yellow-500 p-1' onClick={()=>{loginc(); }}>Log in</button>
           
          </form>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h4 className="text-yellow-800">Usama Production</h4>
        <a
          href="https://wa.me/+92"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-green-500"
        >
          <i className="bx bxl-whatsapp text-2xl"></i>
        </a>
      </div>
    </div>
  );
}
