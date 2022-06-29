import React, { useState } from "react";
import "./App.css";
import UserAppShell from "./components/user-components/UserAppShell";
import { BrowserRouter } from "react-router-dom";
import "./Material.css";
import MyRoutes from "./components/user-components/MyRoutes";

function App() {
  return (
    <BrowserRouter>
      <UserAppShell>
        <MyRoutes />
      </UserAppShell>
    </BrowserRouter>
  );
}

export default App;
