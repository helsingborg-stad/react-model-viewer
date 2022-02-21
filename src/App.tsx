import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import DebugScreen from "@app/screens/_DebugScreen";
import { Model3DViewerScreen, ErrorScreen, LoadingScreen } from "./screens";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<DebugScreen />} /> */}
        <Route path="/" element={<Model3DViewerScreen />} />
        <Route path="/404" element={<ErrorScreen />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </div>
  );
}

export default App;
