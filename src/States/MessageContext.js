import React, {createContext, useReducer, useContext} from "react";
import { messageReducer } from "./Reducers/messageReducer";
import { Auth } from "./AuthProvider";
// import { UserContext } from "./UserContext";

export const MessageContext = createContext();

const MessageContextPovider = (props) => {
    const {user} = useContext(Auth)
    const [messageMode, dispatch] = useReducer(messageReducer, {
        receiver_id: 1735,
        receiver_class: 'User'
    });
    return ( 
        <MessageContext.Provider value={{messageMode, dispatch}}>
            {props.children}
        </MessageContext.Provider>
    );
}
 
export default MessageContextPovider;