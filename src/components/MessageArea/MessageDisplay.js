import React, {useEffect, useState} from "react";
import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContext";
import { UserContext } from "../../contexts/UserContext";

const MessageDisplay = ({currentUser}) => {
    const {messageMode} = useContext(MessageContext)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("user check: ", currentUser);
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
    }, [messageMode])

    useEffect(() => {
            console.log("message display", messages);
    }, [messages])

    useEffect(() => {
            console.log("messageMode change display", messages);
    }, [messageMode])
    
    return messages.length != 0 ? (
        messages.map((message)=>{
            <div>{message.body}</div>
        })
    ) : (
        <div>MessageDisplay</div>
    )
        
    
}
 
export default MessageDisplay;