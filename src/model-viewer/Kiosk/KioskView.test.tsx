import React from "react";
import { render, screen } from "@testing-library/react";
import KioskView from "./KioskView";
import ModelRepositoryContext, {
  ModelRepositoryContextType,
} from "../ModelRepositoryContext";
import { ModelLinkContext, ModelLinkContextType } from "../ModelLinkContext";
import createDefaultModelLinkService from "../services/model-link-service";
import { Model } from "../types";
import ProvideModelsContext from "../ProvideModelsContext";

type KioskWithDepsProps = {
  link: ModelLinkContextType;
  repository: ModelRepositoryContextType;
};
// The KioskView depends on contexts being present in component
// tree. We can create a KioskView with faked contexts present.
function KioskWithDeps({ link, repository }: KioskWithDepsProps) {
  return (
    <ModelRepositoryContext.Provider value={repository}>
      <ModelLinkContext.Provider value={link}>
        <ProvideModelsContext>
          <KioskView />
        </ProvideModelsContext>
      </ModelLinkContext.Provider>
    </ModelRepositoryContext.Provider>
  );
}

const createLinkService = (currentUrl: string) =>
  createDefaultModelLinkService(() => new URL(currentUrl));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Kiosk", () => {
  it("should display error on error fetching models", () => {
    const link = createLinkService("https://www.example.com");
    const repository = {
      models: [],
      error: "an error",
      isLoading: false,
      isError: true,
    };
    render(<KioskWithDeps link={link} repository={repository} />);
    const errorElement = screen.getByTestId("kiosk-has-error");
    expect(errorElement).toBeInTheDocument();
  });

  it("should display a loading message while fetching models", () => {
    const link = createLinkService("https://www.example.com");
    const repository = {
      models: [],
      error: null,
      isLoading: true,
      isError: false,
    };
    render(<KioskWithDeps link={link} repository={repository} />);
    const errorElement = screen.getByTestId("kiosk-is-loading");
    expect(errorElement).toBeInTheDocument();
  });

  it("should select the first model after loading", async () => {
    const link = createLinkService("https://www.example.com");
    const models = createTestModels();
    const repository = {
      models,
      error: null,
      isLoading: false,
      isError: false,
    };
    render(<KioskWithDeps link={link} repository={repository} />);

    const modelElement = await screen.getByTestId("kioskview-for-model-59");
    expect(modelElement).toBeInTheDocument();
  });

  it("should select the model denoted in url", async () => {
    const link = createLinkService("https://www.example.com/?model_id=55");
    const models = createTestModels();
    const repository = {
      models,
      error: null,
      isLoading: false,
      isError: false,
    };
    render(<KioskWithDeps link={link} repository={repository} />);

    const modelElement = await screen.getByTestId("kioskview-for-model-55");
    expect(modelElement).toBeInTheDocument();
  });
});

function createTestModels(): Model[] {
  return [
    {
      id: "59",
      title: "72 H22 ex1",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/03/telefonare.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/03/telefonare.usdz",
      },
      school: { name: "h22skolan", label: "H22skolan" },
    },
    {
      id: "55",
      title: "Lego test",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/03/lego_test.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/03/lego_test.usdz",
      },
      school: { name: "lego-h22", label: "Lego H22" },
    },
    {
      id: "46",
      title: "Svensgårdsskolan 4",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_4.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_4.usdz",
      },
      school: { name: "svensgardsskolan", label: "Svensgårdsskolan" },
    },
    {
      id: "42",
      title: "Svensgårdsskolan 3",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_3.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_3.usdz",
      },
      school: { name: "svensgardsskolan", label: "Svensgårdsskolan" },
    },
    {
      id: "38",
      title: "Svensgårdsskolan 2",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_2.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/svensgardsskolan_2.usdz",
      },
      school: { name: "svensgardsskolan", label: "Svensgårdsskolan" },
    },
    {
      id: "33",
      title: "V Ramlösa förskola – badhus",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/vastraramlosafskklassbadhus.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/vacc88stra-ramlocc88sa-f-klass-badhus-poly.usdz",
      },
      school: {
        name: "vastra-ramlosa-forskola",
        label: "Västra ramlösa förskola",
      },
    },
    {
      id: "28",
      title: "Grupp Trädet",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/tree.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/tree___1645130046598.usdz",
      },
      school: { name: "exempel-skola-1", label: "Exempel skola 1" },
    },
    {
      id: "24",
      title: "Grupp Dino",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/dino.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/dino___1645129995277.usdz",
      },
      school: { name: "exempel-skola-2", label: "Exempel skola 2" },
    },
    {
      id: "20",
      title: "Grupp Tornet",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/torn.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/usdz_torn___1645129968017.usdz",
      },
      school: { name: "exempel-skola-1", label: "Exempel skola 1" },
    },
    {
      id: "11",
      title: "Grupp Myntet",
      src: {
        gltf: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/mynt.glb",
        usdz: "https://modul-test.helsingborg.io/wp-content/uploads/sites/30/2022/02/mynt.usdz",
      },
      school: { name: "exempel-skola-2", label: "Exempel skola 2" },
    },
  ];
}
