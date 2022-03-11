import React, {useContext, useState, useEffect} from "react";
import { MessageContext } from "../States/MessageContext";
import MessageAreaHeader from "./MessageArea/MessageAreaHeader";
import SendMessage from "./MessageArea/SendMessage";

const MessageArea = ({currentUser}) => {
    const {messageMode} = useContext(MessageContext)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("user check: ", currentUser);
        if(currentUser != ''){
            const responseBody = fetch(`http://206.189.91.54/api/v1/messages/?receiver_id=${messageMode.receiver_id}&receiver_class=${messageMode.receiver_class}`, {
                method: 'GET',
                headers: {
                    "expiry": currentUser.expiry,
                    "uid": currentUser.uid,
                    "access-token": currentUser["access-token"],
                    "client": currentUser.client
                }
            })
            .then(response => response.json())
            .then(data => {
                setMessages(data.data);
                return data
            })
            return responseBody;
        }

    }, [messageMode, currentUser])

    useEffect(() => {
            console.log("message display", messages);
    }, [messages])

    useEffect(() => {
            console.log("messageMode change display", messages);
    }, [messageMode])


    return (
        <div className="flex flex-col border border-black h-screen grow-16">
            <MessageAreaHeader/>
            {/* <MessageDisplay currentUser={currentUser}/> */}
            <div className="border border-black grow-16">
                <ul>
                {(messages !== undefined) || (messages.length != 0 ) ? (
                messages.map((message)=>{
                    return <li key={Math.random()}>{message.body}</li>
                    })
                ) : (
                    <div>MessageDisplay</div>
                )}
                </ul>
            </div>
            <SendMessage currentUser={currentUser}/>
        </div> 
    );

    // return(
    //     <div className="border border-black h-screen grow-16">
    //         MessageArea
    //     </div>
    // )
}
 
export default MessageArea;