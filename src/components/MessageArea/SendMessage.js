import { useState, useContext } from "react";
import { MessageContext } from "../../States/MessageContext";
import axios from "axios";

const SendMessage = ({currentUser}) => {
    const {messageMode} = useContext(MessageContext)
    const [messageToSend, setMessageToSend] = useState();

    let bodyContents = {
        receiver_id: parseInt(messageMode["receiver_id"]),
        receiver_class: messageMode["receiver_class"],
        body: messageToSend
    }

    let headers = {
        "expiry": currentUser.expiry,
        "uid": currentUser.uid,
        "access-token": currentUser["access-token"],
        "client": currentUser.client
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("toString: ", parseInt(messageMode["receiver_id"]))
        const responseBody = fetch(`http://206.189.91.54/api/v1/messages`, {
            method: 'POST',
            body: JSON.stringify(bodyContents),
            headers: {
                "expiry": currentUser.expiry,
                "uid": currentUser.uid,
                "access-token": currentUser["access-token"],
                "client": currentUser.client
            }
        })
        .then(response => response.json())
        .then(data => {
            // setMessages(data.data);
            console.log("send request result: ", data)
            console.log("bodyContents: ", bodyContents)
            return data
        })

        // console.log("bodyContents: ", bodyContents)
        // console.log("headers: ", headers)

        // axios.post('http://206.189.91.54/api/v1/messages', bodyContents, headers)
        // .then((response) => {
        //     console.log("Success axios", response)
        // }, (error)=> {
        //     console.log("Rejected", error)
        // })

        
    }
    return ( 
        <div className="border border-black h-14 w-full">
            SendMessage<br/>
            <form onSubmit={handleSubmit}>
                <textarea className="border border-black h-14"
                 style={{width: "90%"}} placeholder={"Send message"} 
                onChange={(e)=>{setMessageToSend(e.target.value)}} value={messageToSend}/>
                <button type="Submit">Send</button>
            </form>
        </div> 
    );
}
 
export default SendMessage;