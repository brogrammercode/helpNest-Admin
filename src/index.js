import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "../src/core/routes";
import { theme } from "../src/core/theme";
import store from "../src/core/store";
import { Provider } from "react-redux";
import { firebaseConfig } from "./core/firebase_config";
import { initializeApp } from "firebase/app";
import { AppSecrets } from "./core/secrets";
import './index.css';
import { createClient } from "@supabase/supabase-js";

initializeApp(firebaseConfig);

const supabase = createClient(
  AppSecrets.REACT_APP_SUPABASE_URL,
  AppSecrets.REACT_APP_SUPABASE_ANON_KEY
);
window.supabase = supabase;
export { supabase };

const App = () => {
  return (
    <Provider store={store}>
      <div className="font-montserrat font-medium" style={{ backgroundColor: theme.light.colors.background, color: theme.light.colors.text }}>
        <AppRoutes />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
