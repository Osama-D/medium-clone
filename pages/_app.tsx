import "../styles/globals.css";
import React from "react";
import { Context } from "../components/context";
function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
