import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "../src/core/routes";
import { theme } from "../src/core/theme";
import { Provider } from "react-redux";
import { store } from "../src/core/store";

const App = () => {

  return (
    <Provider store={store}>
      <div style={{ backgroundColor: theme.light.colors.background, color: theme.light.colors.text }}>
        <AppRoutes />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
