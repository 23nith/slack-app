import { useContext } from "react";
import { MessageContext } from "../../States/MessageContext";

const Channels = ({channel}) => {
    const {dispatch} = useContext(MessageContext)
    const {messageMode} = useContext(MessageContext);
    const handleClick = (e) => {
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'Channel', "name": e.target.innerText}})
    }
    return ( 
        <li className={`w-fit px-4 cursor-pointer rounded-md ${channel.name == messageMode.name ? "font-bold bg-gray-400 text-zinc-700": ""}`} key={channel.id} id={channel.id} onClick={handleClick}>{channel.name}</li>
    );
}
 
export default Channels;