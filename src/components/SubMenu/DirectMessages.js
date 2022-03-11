import React, {useContext, useEffect, useState} from "react";
import { MessageContext } from "../../States/MessageContext";
import { Auth } from "../../States/AuthProvider";
import axios from "axios";

const DirectMessages = ({currentUser}) => {
    // const {user} = useContext(Auth);
    const {dispatch} = useContext(MessageContext);
    const [messengers, setMessengers] = useState('')

    useEffect(() => {
        if(currentUser !== ''){
            const responseBody = axios({
                url: "/messages",
                baseURL: "http://206.189.91.54/api/v1",
                method: 'get',
                params: {
                    receiver_id: 1735,
                    receiver_class: 'User'
                },
                headers: {
                    "expiry": currentUser.expiry,
                    "uid": currentUser.uid,
                    "access-token": currentUser["access-token"],
                    "client": currentUser.client
                }
            })
            .then(response => {
                const senders = response.data.data.map((item)=>{
                    return {id: item.receiver.id, email: item.receiver.email};
                })
                const sendersUnique = senders.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.place === value.place && t.name === value.name
                    ))
                )
                setMessengers(sendersUnique);
                return response
            })
            return responseBody
        }

    }, [currentUser])

    const handleClick = (e) => {
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'User'}})
    }

    return messengers.length != 0 ? (
        messengers.map((messenger)=>{
            return (
                <li key={messenger.id} id={messenger.id} onClick={handleClick}>{messenger.email}</li>
            )
        })
    ) : (
        <li>DirectMessages</li>
    )
}
 
export default DirectMessages;