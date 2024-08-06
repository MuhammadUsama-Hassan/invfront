import React from 'react';
import 'boxicons/css/boxicons.min.css';
import 'animate.css';
import {useHistory} from "react-router-dom";


const Sidebar = () => {

  const history = useHistory();
  
  const logout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('accountstatus')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('hotel')

    sessionStorage.removeItem('contact')
    sessionStorage.removeItem('market')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('area')
    

    history.push('/')
}

const pd=()=>{


  history.push('/products')
}

const db=()=>{


  history.push('/')
}

const cm=()=>{


  history.push('/customers')
}


const tg=()=>{


  history.push('/testings')
}

const rp=()=>{


  history.push('/reports')
}

  return (
    <div className='flex-col w-full lg:w-[20vw] bg-gray-800 text-white shadow-lg px-4 lg:px-8 py-10 min-h-screen'>

      <h1 className='text-4xl text-yellow-500 font-bold mb-8 animate__animated animate__fadeInLeftBig animate__infinite animate__slower'>Dashboard</h1>
      <ul className='my-3'>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {db}>
          <i className='bx bx-home-alt text-4xl mr-2'></i> Dashboard
        </li>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {pd}>
          <i className='bx bx-info-circle text-4xl mr-2'></i> Products
        </li>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {cm}>
          <i className='bx bx-envelope text-4xl mr-2'></i> Customer
        </li>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {tg}>
          <i className='bx bx-box text-4xl mr-2'></i> Stock
        </li>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {rp}>
          <i className='bx bx-file text-4xl mr-2'></i> Reports
        </li>
        <li className='py-3 flex items-center text-gray-300 hover:text-yellow-500 hover:cursor-pointer transition' onClick = {logout} >
          <i className='bx bx-log-out text-4xl mr-2'></i> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
