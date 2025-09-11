import { describe, it, expect } from "vitest";
import { getThemeById, getAllThemes } from "./themes";
describe("Theme ID's", () => {
  it("should ensure all theme IDs are unique", () => {
    expect(getAllThemes());
  });
});

describe("Theme Utilities", () => {
  it("should retrieve a theme by its ID", () => {
    const theme = getThemeById("default");
    expect(theme).toBeDefined();
    expect(theme?.id).toBe("default");
  });
});
