import { useState } from "react"
const ChatInput=()=>{

   const[textarea,setTextarea]=useState("");
    return(
        <div className="ChatInput">
          <textarea className="CInput" cols="20" rows="2"
          value={textarea}
            onChange={(e)=>{setTextarea(e.target.value)}}
          >
         </textarea>
         <button type="submit">Submit</button>
        </div>
    )
}
export default ChatInput