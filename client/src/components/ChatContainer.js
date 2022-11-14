import ChatHeader from "./ChatHeader"
import ChatDisplay from "./ChatDisplay"
import MatchesDisplay from "./MatchesDisplay"
const ChatContainer=()=>{


    return(
        <div className="ChatContainer">
          <ChatHeader/>
          <div className="option">
          <button type="option">Matches</button>
          <button type="option">Chats</button>
          </div>
          <ChatDisplay/>
          <MatchesDisplay/>
        </div>
    )
}
export default ChatContainer