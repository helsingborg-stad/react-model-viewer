import createDefaultModelLinkService from "./model-link-service";

const createLinkService = (currentUrl: string) =>
  createDefaultModelLinkService(() => new URL(currentUrl));
describe("model-link-service", () => {
  describe("getModelFromUrl()", () => {
    const makeTestModel = (id: string) => ({ id, name: `model-${id}` });

    it("should return null when there are no models no match", () => {
      const linkService = createLinkService(
        "https://www.example.com?model_id=xyz"
      );
      expect(linkService.getModelFromUrl([])).toBeNull();
    });
    it("should return null when there is no matching", () => {
      const linkService = createLinkService(
        "https://www.example.com?model_id=not-found"
      );
      expect(
        linkService.getModelFromUrl([
          makeTestModel("abc"),
          makeTestModel("xyz"),
        ])
      ).toBeNull();
    });
    it("should return match by id", () => {
      const linkService = createLinkService(
        "https://www.example.com?model_id=xyz"
      );
      expect(
        linkService.getModelFromUrl([
          makeTestModel("abc"),
          makeTestModel("xyz"),
          makeTestModel("pqr"),
        ])
      ).toEqual(makeTestModel("xyz"));
    });
  });
  describe("getModelUrl()", () => {
    it("should use model_id query parameter for model id", () => {
      const linkService = createLinkService("https://www.example.com");
      expect(linkService.getModelUrl({ id: "123" })).toBe(
        "https://www.example.com/?model_id=123"
      );
    });

    it("should not discard other query variables", () => {
      const linkService = createLinkService(
        "https://www.example.com/index?a=1&b=2"
      );
      expect(linkService.getModelUrl({ id: "abc" })).toBe(
        "https://www.example.com/index?a=1&b=2&model_id=abc"
      );
    });
  });
});
