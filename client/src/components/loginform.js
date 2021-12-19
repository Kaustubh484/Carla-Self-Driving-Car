// import React from "react";
// const LoginForm = ({isShowLogin}) =>{
//     return(
//         <div className={`${!isShowLogin ? "active":" "} show`}>
//             <div className="demo-wrap" id="pop">
//     <div className="demo-content" id="loginform">
//         {/* <span className="border border-dark"> */}
//         <form>
//             <h1 className="login-text">Sign In</h1>
//             <label>Username</label><br/><br/>
//             <input 
//             type="text"
//             name="Username"
//             className="login-box"
//     /><br/><br/>
//     <label>Password</label><br/><br/>
//     <input 
//             type="password"
//             name="password"
//             className="login-box"
//     /><br/><br/>
//     <input type="submit" value="LOGIN" className="btn" />
//     {/* </span> */}
//         </form>
//     </div>
//       </div>
//         </div>
//     );
// }
// export default LoginForm;




import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const LoginForm = () => {
   

const[username,setUsername]=useState("");
const[password,setPassword]=useState("");
const navigate= useNavigate();

function HandleSubmit(e){
    e.preventDefault();
    const user={username,password};
    axios({
        method:"post",
        data:user,
        withCredentials:true,
        url:`http://localhost:5000/login`
    }).then((res)=>{
        console.log(res);
        if(res.data.login){
            navigate(`/userPage/${res.data.userid}`);
        }
        
    });
   
}



    return (
        <div className= "show">
            {/* <div className="demo-wrap" id="pop">
                <div className="demo-content" id="loginform">
                  




                    <form>






                        <h1 className="login-text">Sign In</h1>
                        <label>Username</label><br /><br />
                        <input
                            type="text"
                            name="Username"
                            className="login-box"
                        /><br /><br />
                        <label>Password</label><br /><br />
                        <input
                            type="password"
                            name="password"
                            className="login-box"
                        /><br /><br />
                        <input type="submit" value="LOGIN" className="btn" />










                    </form>
                </div>
            </div> */


                
                <div className="demo">
                  <form onSubmit={HandleSubmit}>
                    <div className="container">
                    
                        <div className="form" bg-color="grey">
                            <div className="header">
                                <h1 className="glow">Sign In</h1>
                            </div>

                            <div className="middle">
                                
                               
                                <div class="box">

                                    <input type="text" name="username" id="username" placeholder="Enter Your Username"  
                                    value={username}
                                    onChange={(e)=>{setUsername(e.target.value)}}/>
                                </div>
                               

                                <div class="box">
                                    <input type="password" name="password" id="password" placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>


                            </div>
                            <div className="footer">
                            <button type="submit" class="btn btn-outline-dark">Sign In</button>
                            <br>
                            </br>
                            Don't have an account?
                            <button onClick={()=>{navigate('/register')}} class="btn btn-outline-dark">Register</button>
                            </div>

                        </div>
                        <div className="form" id="image">
                        </div>
                       

                    </div>
                    </form>
              

                </div>




            }
        </div>
    );
}
export default LoginForm;