import { useState, useContext } from "react";
import { MessageContext } from "../../States/MessageContext";
import { useAuthProvider } from "../../States/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";

const SendMessage = ({myfunc}) => {
    const [{ user }] = useAuthProvider();
    const {messageMode} = useContext(MessageContext)
    const [messageToSend, setMessageToSend] = useState();

    const {register, handleSubmit} = useForm();
    
    const sendMessage = (data) =>{
        let bodyContents = {
            receiver_id: parseInt(messageMode["receiver_id"]),
            receiver_class: messageMode["receiver_class"],
            body: data.messageToSend
        }
    
        let requestHeaders = {
            headers: {
            "expiry": user.expiry,
            "uid": user.uid,
            "access-token": user["access-token"],
            "client": user.client
            }
        }

        axios.post('http://206.189.91.54/api/v1/messages', bodyContents, requestHeaders)
        .then((response) => {
            console.log("Success axios", response)
            myfunc()
        }, (error)=> {
            console.log("Rejected", error)
        })
    }

    
    return ( 
        <div className="h-17 w-full bg-dark p-4">
            <form onSubmit={handleSubmit(sendMessage)}>
                <textarea className="border border-black h-12 text-black"
                 style={{width: "90%"}} 
                 placeholder={"Send message"} 
                 {...register("messageToSend", {
                     required: "true",
                     onChange: (e)=> setMessageToSend(e.target.value) 
                    })}
                 value={messageToSend}/>

                <button type="Submit">Send</button>
            </form>
        </div> 
    );
}
 
export default SendMessage;