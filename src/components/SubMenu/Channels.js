import { useContext } from "react";
import { MessageContext } from "../../States/MessageContext";

const Channels = ({channel}) => {
    const {dispatch} = useContext(MessageContext)
    const handleClick = (e) => {
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'Channel'}})
    }
    return ( 
        <li key={channel.id} id={channel.id} onClick={handleClick}>{channel.name}</li>
    );
}
 
export default Channels;