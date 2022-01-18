//Primary Page of the User after Login

import { useParams,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
const UserPage = () => {
    const{id}= useParams();//hook to use parameter(Using id to get info of user using axios)

   // All states
    const [User,setUser]=useState(null);
    const[NotUser,SetNotUser]=useState(null);
    const[Loading,SetLoading]=useState(true);
    const[pic,setPic]=useState('');
    const [image,setImage]=useState(false);
    

    //Grab info of user on start
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

        fetchImage();
        
        },[]);
        // handle submit of entire form
        const handleSubmit= async(e)=>{
         
        }
        // handle uploading of pic to backend
        const picUpdate= async(e)=>{
           e.preventDefault(); 
           const formdata= new FormData();
           formdata.append('pic',pic);
           try{
          const res= await axios.post(
               `http://localhost:5000/upload/image/${id}`,
               formdata,
               {
                   headers:{
                       'Content-Type':'multipart/form-data'
                     }
               }
               )
               if(res.data.image){
                   setImage(res.data.image);
               }
            }
               catch(err){
                   console.log(err);
               }
        }
        //Function to fetchimage from backend
        const fetchImage=()=>{
            axios.get(`http://localhost:5000/upload/image/${id}`).
            then((res)=>{
               
                if(res.status==200 && res.data.image){
                 setImage(res.data.image);
                }
            }).catch((err)=>{
                console.log(err);
                setImage(false);
            })

        }
       // Function called on pressing delete button
        const deleteimage=()=>{
            axios.delete(`http://localhost:5000/upload/image/${id}/delete`).then((res)=>{
                console.log(res);
                fetchImage();
            }).catch((err)=>{
                console.log(err);
            })
        }
       
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
            {image ? <img src={`http://localhost:5000/upload/${image.filename}`} alt="no pic found"/>:<div><h4>No Image Found</h4></div>} 
            <button onClick={()=>{deleteimage();}}>Delete current profile pic</button>
            <form  onSubmit={picUpdate}>
                <label>Profile Picture</label>
                <input type="file" name="profilepic" id="pic" 
                onChange={(e)=>{setPic(e.target.files[0])
                console.log(e.target.files[0].name)}} />
                <input type="submit" value="Upload" />
                </form>
            <form onSubmit={handleSubmit} id="details">
              
                
                <label> Full Name</label>
                <input type="text" />
                <label>email </label>
                <input type="text" />
                <label>Github Link </label>
                <input type="url" name="githubLink" id="" />
                <label>Linkedin Link </label>
                <input type="url" name="linkedinLink" id="" />
                <label>Write a description about yourself</label>
                <textarea name="Description" id="des" cols="30" rows="5"></textarea>
                <button type="submit">Update Details</button>
            </form>
            </div>
    )}
   

    </div>
    );
    }
export default UserPage;