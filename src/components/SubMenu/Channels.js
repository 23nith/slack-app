import { useContext } from "react";
import { MessageContext } from "../../States/MessageContext";

const Channels = ({channel, currentUser}) => {
    const {dispatch} = useContext(MessageContext)
    const handleClick = (e) => {
        console.log("target: ", e.target.id);
        console.log("currentUser: ", currentUser.id)
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'Channel'}})
    }
    return ( 
        <li key={channel.id} id={channel.id} onClick={handleClick}>{channel.name}</li>
    );
}
 
export default Channels;