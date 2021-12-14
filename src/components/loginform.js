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
const LoginForm = ({ isShowLogin }) => {
    return (
        <div className={`${!isShowLogin ? "active" : " "} show`}>
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

                    <div className="container">
                        <div className="form" bg-color="grey">
                            <div className="header">
                                <h1 className="glow">Sign In</h1>
                            </div>

                            <div className="middle">
                                <div class="box">

                                    <input type="email" name="email" id="email" placeholder="Enter Your Email" />
                                </div>

                                <div class="box">
                                    <input type="password" name="password" id="password" placeholder="Enter Your Password" />
                                </div>


                            </div>
                            <div className="footer">
                            <button type="button" class="btn btn-outline-dark">Sign In</button>
                            </div>

                        </div>
                        <div className="form" id="image">
                        </div>


                    </div>



                </div>




            }
        </div>
    );
}
export default LoginForm;