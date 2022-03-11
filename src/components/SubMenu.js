import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../States/AuthProvider";
import Channels from "./SubMenu/Channels";
import DirectMessages from "./SubMenu/DirectMessages";

const SubMenu = ({currentUser}) => {
    // const {user} = useContext(Auth)
    useEffect(()=>{
        console.log(currentUser)
    }, [currentUser])


    const [channels, setChannels] = useState([]);

    useEffect(async() => {
        console.log("currentUser: ", currentUser)
        if(currentUser != ''){
            const responseBody = fetch("http://206.189.91.54/api/v1/channels", {
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
                setChannels(data.data);
                console.log("channels: ", data.data)
                return data
            })
            return responseBody;
        }

        // if(currentUser != ''){
        //     let headers = {
        //         expiry: currentUser.expiry,
        //         uid: currentUser.uid,
        //         "access-token": currentUser["access-token"],
        //         client: currentUser.client
        //     }

        // const responseBody = await axios.get("http://206.189.91.54/api/v1/channels", headers)
        // .then((response) => {
        //     // setChannels(response.data);
        //     console.log("response data: ", response.data)
        //     return response;
        // })

        // return responseBody;
        // }

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
                    return <Channels channel={channel} currentUser={currentUser}/> 
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