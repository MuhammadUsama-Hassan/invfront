// Dashboard.js
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import 'boxicons/css/boxicons.min.css';
import Chart from 'chart.js/auto';
import {useHistory} from "react-router-dom";

const Welcome = (props) => {
  const history = useHistory() 
  const [roleau, setroleau] = useState ('');
  const [userState, setUserState] = useState([]);
  const [accountStatus, setAccountStatus] = useState([]);

  const [useremail, setuserEmail] = useState([]);

  const [hotelname, sethotelname] = useState([]);

  const [userState2, setUserState2] = useState([]);
  const [userState3, setUserState3] = useState([]);


  const getdata = async () => {

    const findEmail2 = sessionStorage.getItem('user'); 


    const res = await fetch(`http://localhost:9000/api/postbyemail/${findEmail2}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    console.log(data);
    setUserState(data);    

}


const getdata2 = async () => {

  const findEmail2 = sessionStorage.getItem('user'); 


  const res = await fetch(`http://localhost:9000/api/allgetarea`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
      
  });

  const data = await res.json();
  console.log(data, 'data');
  setUserState2(data);    

}

const getdata3 = async () => {

  const findEmail2 = sessionStorage.getItem('user'); 


  const res = await fetch(`http://localhost:9000/api/allgetcategory`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
      
  });

  const data = await res.json();
  console.log(data);
  setUserState3(data);    

}


const gethotelname = async () => {
    // http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/allpostdata

    // `http://localhost:4000https://easy-erin-donkey-cape.cyclic.app/api/postbyemail/${useremail}`
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

    gethotelname()
    
}, []);


     

useEffect(()=>{
    const udata = sessionStorage.getItem('user');    
    setuserEmail(udata); 
    
    getdata()
    getdata2()
    getdata3()



    

}, []);


const routeto=()=>{

    let roleuseradmin = sessionStorage.getItem('role');
    console.log(roleuseradmin, 'roleuseradmin')
    
    const roleua3 = sessionStorage.getItem('accountstatus');


   if (roleuseradmin === 'Admin'){
      history.push('/welcome')
  }
    
 
}

useEffect(() => {
    // getroleauth()
    routeto()
    getrole()
    
    
    }, []);




const getrole=()=>{

    let roleuser = sessionStorage.getItem('role');

    setroleau(roleuser);
    console.log(roleau, 'roleg')

   

}


const getroleauth = async () => {
    
    let femail = sessionStorage.getItem('user');

    const res3 = await fetch(`http://localhost:9000/api/postbyemailsignup/${femail}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });


   
    const role = await res3.json();

    setAccountStatus(role[0]?.accountsstatus)

    console.log(accountStatus, 'status')

    sessionStorage.setItem('accountstatus', [accountStatus])


}


  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Line Chart
    const lineCtx = lineChartRef.current.getContext('2d');
    const lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Line Chart',
            data: [12, 19, 3, 5, 2],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
    });

    // Bar Chart
    const barCtx = barChartRef.current.getContext('2d');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            label: 'Bar Chart',
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
          },
        ],
      },
    });

    // Doughnut Chart
    const doughnutCtx = doughnutChartRef.current.getContext('2d');
    const doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
          },
        ],
      },
    });

    // Pie Chart
    const pieCtx = pieChartRef.current.getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
          },
        ],
      },
    });

    return () => {
      lineChart.destroy();
      barChart.destroy();
      doughnutChart.destroy();
      pieChart.destroy();
    };
  }, []);

  return (
    <div className='flex flex-col md:flex-row h-full'>
      <Sidebar/> 

      <div className='flex-1 bg-gray-100 p-4 md:p-10'>
        <h1 className='text-2xl md:text-4xl mb-4 md:mb-8 text-yellow-500 font-bold'>{hotelname}</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
          <div className='bg-white p-4 md:p-6  rounded-md shadow-md'>
            <h2 className='text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-yellow-500 text-center'>Total Customers</h2>
            <p className='font-bold text-center text-3xl text-gray-500'>50</p>
          </div>

          <div className='bg-white p-4 md:p-6 rounded-md shadow-md'>
            <h2 className='text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-yellow-500 text-center'>Total Stock</h2>
            <p className='text-center font-bold text-3xl text-gray-500'>70</p>
          </div>

          <div className='bg-white p-4 md:p-6 rounded-md shadow-md text-center'>
            <h2 className='text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-yellow-500 text-center'>Total Products</h2>
            <p className='text-center font-bold text-3xl text-gray-500'>100</p>
          </div>

          {/* New Chart Components */}
          <div className='bg-white p-4 md:p-6 rounded-md shadow-md'>
            <canvas ref={lineChartRef} width="400" height="200"></canvas>
          </div>

          <div className='bg-white p-4 md:p-6 rounded-md shadow-md'>
            <canvas ref={barChartRef} width="400" height="200"></canvas>
          </div>

          <div className='bg-white p-4 md:p-6 rounded-md shadow-md'>
            <canvas ref={doughnutChartRef} width="400" height="200"></canvas>
          </div>  

          <div className='bg-white p-4 md:p-6 rounded-md shadow-md'>
            <canvas ref={pieChartRef} width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
