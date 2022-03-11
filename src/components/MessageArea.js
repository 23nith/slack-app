import axios from "axios";
import React, {useContext, useState, useEffect} from "react";
import { MessageContext } from "../States/MessageContext";
import MessageAreaHeader from "./MessageArea/MessageAreaHeader";
import SendMessage from "./MessageArea/SendMessage";

const MessageArea = ({currentUser}) => {
    const {messageMode} = useContext(MessageContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        if(currentUser != ''){
            const responseBody = axios({
                baseURL: "http://206.189.91.54/api/v1",
                url: '/messages',
                method: 'get',
                params: {
                    receiver_id: messageMode.receiver_id,
                    receiver_class: messageMode.receiver_class
                },
                headers: {
                    "expiry": currentUser.expiry,
                    "uid": currentUser.uid,
                    "access-token": currentUser["access-token"],
                    "client": currentUser.client
                }
            })
            .then((response)=>{
                setMessages(response.data.data);
                return response
            }, (error) => {
                console.log(error);
            })
            return responseBody;
        }

    }, [messageMode, currentUser, messages])

    return (
        <div className="flex flex-col border border-black h-screen grow-16">
            <MessageAreaHeader/>
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

}
 
export default MessageArea;