import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./component/Toggle/Providers";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <Providers>
        <Provider store={store}>
          <App />
        </Provider>
      </Providers>
    </NextUIProvider>
  </BrowserRouter>
);
