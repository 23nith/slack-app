import React, {useContext, useEffect, useState} from "react";
import { MessageContext } from "../../States/MessageContext";
import { Auth } from "../../States/AuthProvider";

const DirectMessages = ({currentUser}) => {
    const {dispatch} = useContext(MessageContext);
    // const {user} = useContext(Auth);
    const [messengers, setMessengers] = useState('')

    useEffect(() => {
        // console.log("user: ", user);
        if(currentUser !== ''){
            const responseBody = fetch(`http://206.189.91.54/api/v1/messages/?receiver_id=${1735}&receiver_class=User`, {
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
                const senders = data.data.map((item)=>{
                    return {id: item.receiver.id, email: item.receiver.email};
                })
                const sendersUnique = senders.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.place === value.place && t.name === value.name
                    ))
                )
                setMessengers(sendersUnique);
                return data
            })
            return responseBody
        }

    }, [currentUser])

    useEffect(()=>{
        
        console.log("messengers", messengers)
    }, [messengers])

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