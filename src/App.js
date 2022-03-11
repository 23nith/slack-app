import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import AuthProvider from "./States/AuthProvider";
import { initialState } from "./States/Reducers/AuthReducer";
import AuthReducer from "./States/Reducers/AuthReducer";
import MenuBar from "./components/MenuBar";
import SubMenu from "./components/SubMenu";
import MessageArea from "./components/MessageArea";
import ChannelDetails from "./components/ChannelDetails";
import MessageContextPovider from "./States/MessageContext";


function App() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [isSignupOpen, setToggleSignup] = useState(true);
  const [toggleMainPage, setToggleMainPage] = useState(false);
  const [currentUser, setCurrentUser] = useState('')

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
  const handeleToggleLogin = (_) => {
    setToggleSignup(!isSignupOpen);
  };
  return (
    <AuthProvider reducer={AuthReducer} initialState={initialState}>
      {(toggleMainPage == false) && <div className="w-full bg-gray-600">
        {transtionLogin(
          (style, item) =>
            item && (
              <animated.div
                className="w-2/4 bg-white flex items-center justify-between flex-col h-screen"
                style={style}
              >
                <Login
                  setToggleSignup={setToggleSignup}
                  toggleLogin
                  setToggleLogin={setToggleLogin}
                  setToggleMainPage={setToggleMainPage}
                  setCurrentUser={setCurrentUser} currentUser={currentUser}
                />
              </animated.div>
            )
        )}
        {transtionSignup(
          (style, item) =>
            item && (
              <animated.div
                className="w-3/5 bg-white flex items-center justify-between flex-col h-screen"
                style={style}
              >
                <Signup
                  setToggleSignup={setToggleSignup}
                  isSignupOpen
                  setToggleLogin={setToggleLogin}
                />
              </animated.div>
            )
        )}
        <button onClick={handeleToggleLogin}>test</button>
      </div>}
      {toggleMainPage && 
        <MessageContextPovider>
          <div className="flex flex-row border border-black h-screen">
              <MenuBar/>
              <SubMenu currentUser={currentUser}/>
              <MessageArea currentUser={currentUser}/>
              <ChannelDetails/>
          </div>
        </MessageContextPovider>
      }
    </AuthProvider>
  );
}

export default App;
