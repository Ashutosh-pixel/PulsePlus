import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./component/Toggle/Providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <Providers>
      <App />
    </Providers>
  </NextUIProvider>
);
