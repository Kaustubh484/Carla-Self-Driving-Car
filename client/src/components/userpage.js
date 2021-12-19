import { useParams,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
const UserPage = () => {
    const{id}= useParams();
   
    const [User,setUser]=useState(null);
    const[NotUser,SetNotUser]=useState(null);
    const[Loading,SetLoading]=useState(true);
    useEffect(()=>{
        
        axios({
            method:`GET`,
            withCredentials:true,
            url:`http://localhost:5000/users/${id}`
        }).then((res)=>{
            if(res.data.user){
                setUser(res.data.user);
                SetLoading(false);
            }else{
                SetNotUser(true);
                SetLoading(false);
            }
        })
        
        },[]);
       
    return (
    <div className="UserPage">
    {NotUser &&(
        <div>
            Please login to continue 
            <br>
            </br>
           <Link to="/login"><button>Go To login</button></Link>
           
        </div>
     )
    }

     {Loading && (
        <div>
            <h2>Loading...</h2>
            </div>
    )}

    
    {User && (
        <div>
            Welcome {User.username}
            </div>
    )}
   

    </div>
    );
    }
export default UserPage;