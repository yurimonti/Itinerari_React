import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
import MyRoutes from "./MyRoutes";

function AppContent() {
  return (
    <AppShell>
      <MyRoutes />
    </AppShell>
  );
}

export default AppContent;
