import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "react-oauth-google";

import App from "./App";
import "./style/style.css";
import { store } from "./component/store/store";
import { Toaster } from "react-hot-toast";

const GOOGLE_CLIENT_ID =
  "177987024396-2k935vlmislv9btiugi95nb63pf6b1aj.apps.googleusercontent.com";

if (!GOOGLE_CLIENT_ID) {
  console.warn(
    "VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env as VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com"
  );
}

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App></App>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "18px",
            padding: "16px 24px",
            minWidth: "320px",
            borderRadius: "14px",
            fontWeight: "600",
            zIndex: 99999,
          },
          success: {
            style: {
              background: "#22c55e",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "white",
            },
          },
        }}
      />
    </Provider>
  </GoogleOAuthProvider>
);
