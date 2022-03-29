import React from "react";
import "./App.css";
import KioskView from "./model-viewer/Kiosk/KioskView";
import ProvideGQLModelRepositoryContext from "./model-viewer/gql/ProvideGQLModelRepositoryContext";
import ProvideModelsContext from "./model-viewer/ProvideModelsContext";
import { ModelLinkContext } from "./model-viewer/ModelLinkContext";
import createDefaultModelLinkService, {
  ModelLinkService,
} from "./model-viewer/services/model-link-service";

function App() {
  const linksService = createDefaultModelLinkService();
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
        <ModelLinkContext.Provider value={linksService}>
          <ProvideModelsContext>
            <KioskView />
          </ProvideModelsContext>
        </ModelLinkContext.Provider>
      </ProvideGQLModelRepositoryContext>
    </div>
  );
}

export default App;
