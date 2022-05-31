import React, { useState } from "react";
import "./App.css";
import UserAppShell from "./components/user-components/UserAppShell";
import ExampleComponent from "./components/ExampleComponent";
import LoginForm from "./components/LoginForm";
import AddPoiFormsComponent from "./components/ente-components/AddPoiFormsComponent";
import ExampleListBox from "./components/ExampleListBox";

function App() {
  const [selected, setselected] = useState([]);
  return (
    <UserAppShell>
      <ExampleComponent /> 
    </UserAppShell>
  );
}

export default App;
