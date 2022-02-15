import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  ThreeDemoScreen,
  ReactThreeArJsScreen,
  ReactThreeXrScreen,
  CustomModelViewerScreen,
  ModelViewerScreenWithMynt,
  ModelViewerScreenWithH22,
} from "@app/screens";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ModelViewerScreenWithMynt />} />
        <Route path="mynt" element={<ModelViewerScreenWithMynt />} />
        <Route path="h22" element={<ModelViewerScreenWithH22 />} />
        <Route path="custom-viewer" element={<CustomModelViewerScreen />} />
        <Route path="three-demo" element={<ThreeDemoScreen />} />
        <Route path="react-three-arjs" element={<ReactThreeArJsScreen />} />
        <Route path="react-three-xr" element={<ReactThreeXrScreen />} />
      </Routes>
    </div>
  );
}

export default App;
