import React from "react";
import { render, screen } from "@testing-library/react";
import KioskView from "./KioskView";
import ModelRepositoryContext, {
  ModelRepositoryContextType,
} from "../ModelRepositoryContext";
import { ModelLinkContext, ModelLinkContextType } from "../ModelLinkContext";
import createDefaultModelLinkService from "../services/model-link-service";

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
        <KioskView />
      </ModelLinkContext.Provider>
    </ModelRepositoryContext.Provider>
  );
}

const createLinkService = (currentUrl: string) =>
  createDefaultModelLinkService(() => new URL(currentUrl));

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
});
