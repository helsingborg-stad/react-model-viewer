import React from "react";
import "./App.css";
import KioskView from "./model-viewer/Kiosk/KioskView";
// import KioskViewModified from "./model-viewer/Kiosk/KioskViewModified";

import ProvideGQLModelRepositoryContext from "./model-viewer/gql/ProvideGQLModelRepositoryContext";
import ProvideModelsContext from "./model-viewer/ProvideModelsContext";
import { ModelLinkContext } from "./model-viewer/ModelLinkContext";
import createDefaultModelLinkService, {
  ModelLinkService,
} from "./model-viewer/services/model-link-service";
import { Model } from "./model-viewer/types";


function App() {
  const linksService = createDefaultModelLinkService();
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false)
  const galleryId = new URL(window.location.href).searchParams.get("gallery_id");

  // get from URL
  // const id = 691;

  const url = `https://modul-test.helsingborg.io/barnens-h22/wp-json/wp/v2/galleries/${galleryId}?acf_format=standard`;

  React.useEffect(() => {
    setLoading(true)
    fetch(url).then((res) => res.json()).catch(err => { setError(true); setLoading(false) })
      .then((res) => {
        setLoading(false)
        setData(res)
      })
  }, [url])

  const models = data?.acf?.models.map((m: any): Model[] => ({
    ...m, id: m.name, title: m.name, src: { usdz: m["source-usdz"], gltf: m["source-glb"] }, school: {
      name: "skola",
      label: "label"
    },
    featuredImage: {
      src: "https://modul-test.helsingborg.io/barnens-h22/wp-content/uploads/2021/03/IMG_20210304_114000.jpg",
      srcSet: ""
    }
  }));

  return (
    <div className="App">
      <ProvideGQLModelRepositoryContext
        overrideForDebugPurposes={
          {
            isLoading: loading,
            isError: !!error,
            error,
            models: models ?? [],
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
