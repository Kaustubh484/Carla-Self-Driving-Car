
import './App.css';
// import hack from './hack3.jpg';
import React,{useState}from 'react'
import LoginForm from './components/loginform'
import Navbar from './components/navbar';
export default function App(){
  const[isShowLogin,setIsShowLogin]=useState(false)
  const handleLoginClick =() =>{
    setIsShowLogin((isShowLogin)=> !isShowLogin)
  }

  return (
    <div className="App">
    <Navbar title="Hack Squad" handleLoginClick={handleLoginClick} />
    <LoginForm isShowLogin={isShowLogin}/>
</div>
    
  );
}

