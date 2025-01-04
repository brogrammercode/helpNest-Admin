import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "../src/core/routes";
import { theme } from "../src/core/theme";
import store from "../src/core/store"
import { Provider } from "react-redux";
import { firebaseConfig } from "./core/firebase_config";
import { initializeApp } from "firebase/app";

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: theme.light.colors.background, color: theme.light.colors.text }}>
        <AppRoutes />
      </div>
    </Provider>
  );
};


initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById("root"));
