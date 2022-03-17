import { useState, useCallback, useContext } from "react";
import { useTransition } from "react-spring";
import AuthProvider from "./States/AuthProvider";
import { authInitialState } from "./States/Reducers/AuthReducer";
import AuthReducer from "./States/Reducers/AuthReducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Signup from "./Auth/Signup";
import PrivateRoute from "./Auth/PrivateRoute";
import MenuBar from "./components/MenuBar"
import SubMenu from "./components/SubMenu"
import MessageArea from "./components/MessageArea"
import ChannelDetails from "./components/ChannelDetails"
import MessageContextPovider from "./States/MessageContext";
import { useAuthProvider } from "./States/AuthProvider";
import {MessageContext} from "./States/MessageContext";
import axios from "axios";


function App() {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [isSignupOpen, setToggleSignup] = useState(false);
  const [{ user }] = useAuthProvider();
  const {messageMode} = useContext(MessageContext);
  const [messages, setMessages] = useState([]);

  // Create transition for login
  const transtionLogin = useTransition(toggleLogin, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 500,
      friction: 30,
      clamp: true,
    },
  });
  // Create transition for signup
  const transtionSignup = useTransition(isSignupOpen, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 450,
      friction: 35,
      clamp: true,
    },
  });

  const myfunc = useCallback(async() => {
    if(user != undefined){
        console.log("messages: ", messages);
        const responseBody = await axios({
            baseURL: "http://206.189.91.54/api/v1",
            url: '/messages',
            method: 'get',
            params: {
                receiver_id: messageMode.receiver_id,
                receiver_class: messageMode.receiver_class
            },
            headers: {
                "expiry": user.expiry,
                "uid": user.uid,
                "access-token": user["access-token"],
                "client": user.client
            }
        })
        .then((response)=>{
            setMessages(response.data.data);
            return response
        }, (error) => {
            console.log(error);
        })
        return responseBody;
    }
}, [messageMode.receiver_id, user])

const updateMessage = () => setInterval(myfunc, 5000);

  return (
    // Auth set up
    <BrowserRouter>
      <div className="w-full h-full bg-gray-600">
        <AuthProvider reducer={AuthReducer} initialState={authInitialState}>
          <MessageContextPovider>
          <Routes>
            <Route
              path="/"
              element={
                <Auth
                  transtionLogin={transtionLogin}
                  transtionSignup={transtionSignup}
                  isSignupOpen={isSignupOpen}
                  setToggleLogin={setToggleLogin}
                  setToggleSignup={setToggleSignup}
                  toggleLogin={toggleLogin}
                />
              }
            />
            <Route
              path="account"
              element={
                <PrivateRoute>
                  {/* logged in account component here */}
                  <div className="flex flex-row border border-black h-screen text-white">
                    <MenuBar/>
                    <SubMenu updateMessage={updateMessage} />
                    <MessageArea updateMessage={updateMessage} myfunc={myfunc} messages={messages}/>
                    <ChannelDetails/>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
          </MessageContextPovider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
