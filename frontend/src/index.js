import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
import "./styles/index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
// import store, { persistor } from './store/index';
// import { PersistGate } from 'redux-persist/integration/react';

import "./styles/index.css";
import "./styles/minireset.min.css";
import "./styles/pretendard.css";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./components/common/BottomNav";
import FooterBar from "./components/common/FooterBar";
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <BottomNav />
      <App />
      <FooterBar />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
