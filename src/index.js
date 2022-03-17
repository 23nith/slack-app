import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Style/style.css";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./States/AuthProvider";
import AuthReducer from "./States/Reducers/AuthReducer";
import MessageContextPovider from "./States/MessageContext";
import { authInitialState } from "./States/Reducers/AuthReducer";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider reducer={AuthReducer} initialState={authInitialState}>
        <MessageContextPovider>
        <App />
        </MessageContextPovider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
