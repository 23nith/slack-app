import axios from "axios";
import React, {useContext, useState, useEffect, useCallback} from "react";
import { MessageContext } from "../States/MessageContext";
import { useAuthProvider } from "../States/AuthProvider";
import MessageAreaHeader from "./MessageArea/MessageAreaHeader";
import SendMessage from "./MessageArea/SendMessage";
import MessageDisplay from "./MessageArea/MessageDisplay";

const MessageArea = ({updateMessage, myfunc, messages}) => {
    // const [{ user }] = useAuthProvider();
    // const {messageMode} = useContext(MessageContext);
    // const [messages, setMessages] = useState([]);

    // const myfunc = useCallback(async() => {
    //     if(user != undefined){
    //         console.log("messages: ", messages);
    //         const responseBody = await axios({
    //             baseURL: "http://206.189.91.54/api/v1",
    //             url: '/messages',
    //             method: 'get',
    //             params: {
    //                 receiver_id: messageMode.receiver_id,
    //                 receiver_class: messageMode.receiver_class
    //             },
    //             headers: {
    //                 "expiry": user.expiry,
    //                 "uid": user.uid,
    //                 "access-token": user["access-token"],
    //                 "client": user.client
    //             }
    //         })
    //         .then((response)=>{
    //             setMessages(response.data.data);
    //             return response
    //         }, (error) => {
    //             console.log(error);
    //         })
    //         return responseBody;
    //     }
    // }, [messageMode.receiver_id, user])

    // const updateMessage = () => setInterval(myfunc, 5000);

    // GET MESSAGES
    useEffect(() => {
        myfunc()
        // clearInterval(updateMessage)
        updateMessage();
    }, [myfunc])

    // useEffect(()=>{
    //     updateMessage();
    // }, [])

    return (
        <div className="flex flex-col h-screen grow-16">
            <MessageAreaHeader/>
            {/* DISPLAY MESSAGES */}
            <div className="grow-16 overflow-y-scroll bg-messageArea">
                <div className="flex flex-col bg-messageArea p-2 h-fit">
                {(messages !== undefined) || (messages.length != 0 ) ? (
                messages.map((message, index)=>{
                    // return <li key={Math.random()}>{message.body}</li>
                    return (<MessageDisplay key={Math.random()} message={message} ></MessageDisplay>)
                    })
                ) : (
                    <div>MessageDisplay</div>
                )}
                </div>
            </div>
            <SendMessage myfunc={myfunc}/>
        </div> 
    );

}
 
export default MessageArea;