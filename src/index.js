import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Style/style.css";
import { ChakraProvider } from "@chakra-ui/react";
import CreateChannelProvider from "./States/Reducers/CreateChannelProvider";

ReactDOM.render(
  <React.StrictMode>
    <CreateChannelProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CreateChannelProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
