import { useAuthProvider } from "../../States/AuthProvider";

const MessageDisplay = ({message}) => {
    const [{ user }] = useAuthProvider();
    return message.sender.id == user.id ?( 
        <div className="border-2 border-userMessage text-white inline-block self-end p-3 m-1 rounded-l-lg rounded-tr-lg bg-userMessage">
            {message.body}
        </div>
    ):(
        <div className="border-2 border-senderMessage text-white inline-block self-start p-3 m-1 rounded-r-lg rounded-tl-lg bg-senderMessage">
            {message.body}
        </div>
    )
}
 
export default MessageDisplay;