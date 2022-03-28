import React from "react";
import "./App.css";
import KioskView from "./model-viewer/Kiosk/KioskView";
import ProvideGQLModelRepositoryContext from "./model-viewer/gql/ProvideGQLModelRepositoryContext";
import ProvideModelsContext from "./model-viewer/ProvideModelsContext";

function App() {
  return (
    <div className="App">
      <ProvideGQLModelRepositoryContext
        overrideForDebugPurposes={
          {
            // isLoading: true,
            // isError: true,
            // models: [],
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
