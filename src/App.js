import React from "react";
import "./App.css";
import AppShell from "./components/AppShell";
import { BrowserRouter } from "react-router-dom";
import "./Material.css";
import MyRoutes from "./components/MyRoutes";
import { UserInfoProvider } from "./utils/UserInfoProvider";
import AppContent from "./components/AppContent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <AppContent />
      </UserInfoProvider>
    </BrowserRouter>
  );
}

export default App;
