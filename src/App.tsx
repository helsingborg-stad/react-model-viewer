import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import DebugScreen from "@app/screens/_DebugScreen";
import { Model3DViewerScreen, ErrorScreen, LoadingScreen } from "./screens";
import KioskView from "./model-viewer/Kiosk/KioskView";
import ProvideGQLModelRepositoryContext from "./model-viewer/gql/ProvideGQLModelRepositoryContext";
import { ProvideModelsContext } from "./model-viewer/ModelsContext";

function App() {
  /*
      <Routes>
{/ * <Route path="/" element={<DebugScreen />} /> * /}
        <Route path="/" element={<Model3DViewerScreen />} />
        <Route path="/404" element={<ErrorScreen />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
*/
  return (
    <div className="App">
      <ProvideGQLModelRepositoryContext
        overrideForDebugPurposes={
          {
            // isError: true,
            // models: []
          }
        }
      >
        <ProvideModelsContext>
          <KioskView />
        </ProvideModelsContext>
      </ProvideGQLModelRepositoryContext>
    </div>
  );
}

export default App;
