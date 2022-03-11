import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../States/AuthProvider";
import Channels from "./SubMenu/Channels";
import DirectMessages from "./SubMenu/DirectMessages";

const SubMenu = ({currentUser}) => {
    // const {user} = useContext(Auth)
    const [channels, setChannels] = useState([]);

    useEffect(async() => {
        if(currentUser != ''){
            const responseBody = await axios({
                url: "channels", 
                baseURL: "http://206.189.91.54/api/v1/",
                method: 'get',
                headers: {
                    expiry: currentUser.expiry,
                    uid: currentUser.uid,
                    "access-token": currentUser["access-token"],
                    client: currentUser.client
                }
                
            })
            .then((response) => {
                setChannels(response.data.data);
                return response;
            })

            return responseBody;
        }

    }, [currentUser])

    return channels !== '' ? (
        <div className="border border-black h-screen grow-4">SubMenu<br/>
            <ul>
                <li>Threads</li>
                <li>Mentions & reactions</li>
                <li>Drafts</li>
                <li>More</li>
            </ul>
            Channels
            <ul>
                {channels && channels.map(channel => {
                    return <Channels key={channel.id} channel={channel} currentUser={currentUser}/> 
                })}
                <li>Add Channel</li>
            </ul>
            Direct Messages
            <ul>
                <DirectMessages currentUser={currentUser}/>
            </ul>
        </div>
    ):(
        <div className="border border-black h-screen grow-4">SubMenu</div>
    )
        
}
 
export default SubMenu;