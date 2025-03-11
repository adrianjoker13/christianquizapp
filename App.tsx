import React from "react";
import { AppProvider } from "./context/AppContext";
import MainNavigation from "./navigation/MainNavigation"; // ✅ Now it exists!

export default function App() {
  return (
    <AppProvider>
      <MainNavigation />
    </AppProvider>
  );
}
