import React from 'react';
import { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom'
import routes from  '../../routes/routes.json';

const ErrorPage =()=>{
  const navigate=useNavigate();
  const [timer,setTimer]=useState(5);
  const timeoutRef= useRef(null);
  
  useEffect(()=>{
    setTimeout(()=>{
      setTimer((preState)=>preState-1);
    },1000);
  },[timer]);
  

  useEffect(()=>{
    const cbRef=setTimeout(()=>{
      navigate(routes.Home);
    },5000);
    timeoutRef.current=cbRef;
  },[navigate]);

  useEffect(()=>{
    return ()=>{
      clearTimeout(timeoutRef.current);
    };
  },[timeoutRef]);
  return(
    <div className='pt-3'>
      <h3>Error: 404 Not Found</h3>
      <p>Please Click this <Link to="/">link</Link> to redirect to the home page.</p>
      <p>You will be auto redirect to Home page in {timer} seconds.</p>
      </div>
  );
};

export default ErrorPage;