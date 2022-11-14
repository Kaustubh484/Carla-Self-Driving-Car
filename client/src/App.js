
import './App.css';
// import hack from './hack3.jpg';
import React,{useState}from 'react'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoginForm from './components/loginform'
import Navbar from './components/navbar';
import SignupForm from './components/signup';
import About from './components/about';
import UserPage from './components/userpage';
import HomePage from './components/homepage';
import Dashboard from './components/dashboard';
export default function App(){
  const[isShowLogin,setIsShowLogin]=useState(true);
  
  const handleLoginClick =() =>{
    setIsShowLogin((isShowLogin)=> !isShowLogin)
  }
  

  return (
    <Router>
    <div className="App">
    <Navbar title="Hack Squad" 
    handleLoginClick={handleLoginClick}
    isShowLogin={isShowLogin} 
     />
     
   
    {/* <div className="component"> */}
    
      <Routes>
      <Route path= "/" element={<HomePage />}/>
      <Route path= "/register" element={<SignupForm />}/>
      <Route path= "/login" element={<LoginForm />}/>
      <Route path= "/userPage/:id" element={<UserPage />}/>
    <Route path= "/about" element={<About/>}/>
    <Route path= "/dashboard" element={<Dashboard/>}/>
    </Routes>
    </div>
   {/* </div> */}
   </Router>
  );
}

