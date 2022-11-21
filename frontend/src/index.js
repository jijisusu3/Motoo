import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'
import "./styles/index.css";
import App from "./App";

import "./styles/index.css";
import "./styles/minireset.min.css";
import "./styles/pretendard.css";


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./components/common/BottomNav";
import FooterBar from "./components/common/FooterBar";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <BottomNav />
        <App />
        {/* <FooterBar /> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
