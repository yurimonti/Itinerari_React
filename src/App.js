import React, { useState } from "react";
import "./App.css";
import AppShell from "./components/user-components/AppShell";
import { BrowserRouter } from "react-router-dom";
import "./Material.css";
import MyRoutes from "./components/MyRoutes";
import { MyProvider } from "./utils/MyProvider";
import ProvaCheckBox from "./components/prova/ProvaCheckBox";
import ProvaForm from "./components/prova/ProvaForm";

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <AppShell>
          <MyRoutes />
        </AppShell>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
