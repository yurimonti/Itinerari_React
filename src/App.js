import React, { useState } from "react";
import "./App.css";
import UserAppShell from "./components/user-components/UserAppShell";
import ExampleComponent from "./components/ExampleComponent";
import MapComponent from "./components/map-components/MapComponent";
import "./Material.css";

function App() {
  return (
    <UserAppShell>
      <MapComponent />
    </UserAppShell>
  );
}

export default App;
