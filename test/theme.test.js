import assert from "node:assert/strict";
import test from "node:test";

import { DeathlabsThemeProvider, DeathlabsTheme } from "../dist/index.js";

test("exports the default deathlabs theme", () => {
  const lightPalette = DeathlabsTheme.colorSchemes.light.palette;
  const darkPalette = DeathlabsTheme.colorSchemes.dark.palette;

  assert.equal(lightPalette.mode, "light");
  assert.equal(darkPalette.mode, "dark");
  assert.deepEqual(darkPalette.primary, {
    main: "#FF7A1A",
    light: "#FFA05C",
    dark: "#CC5A00",
    contrastText: "#101112",
  });
  assert.deepEqual(lightPalette.primary, darkPalette.primary);
  assert.deepEqual(darkPalette.secondary, {
    main: "#4D9EFF",
    light: "#7DB4FF",
    dark: "#1F5FBF",
    contrastText: "#101112",
  });
  assert.deepEqual(lightPalette.secondary, darkPalette.secondary);
  assert.equal(darkPalette.success.main, "#3DDC84");
  assert.equal(darkPalette.warning.main, "#FFD23F");
  assert.equal(darkPalette.error.main, "#FF3B4E");
  assert.equal(darkPalette.info.main, "#4D9EFF");
  assert.equal(lightPalette.success.main, darkPalette.success.main);
  assert.equal(lightPalette.warning.main, darkPalette.warning.main);
  assert.equal(lightPalette.error.main, darkPalette.error.main);
  assert.equal(lightPalette.info.main, darkPalette.info.main);
  assert.deepEqual(lightPalette.background, {
    default: "#FFF4E8",
    paper: "#FFE0C7",
  });
  assert.equal(lightPalette.divider, "#CC5A00");
  assert.equal(lightPalette.text.primary, "#101112");
  assert.equal(lightPalette.text.secondary, "#2B2E33");
  assert.deepEqual(darkPalette.background, {
    default: "#121314",
    paper: "#1A1C1E",
  });
  assert.equal(darkPalette.divider, "#2B2E33");
  assert.equal(darkPalette.text.primary, "#E4E6E8");
  assert.equal(darkPalette.text.secondary, "#9AA0A6");
});

test("exports a provider configured with the deathlabs theme", () => {
  const element = DeathlabsThemeProvider({ children: "content" });

  assert.equal(typeof DeathlabsThemeProvider, "function");
  assert.equal(element.props.theme, DeathlabsTheme);
  assert.equal(element.props.defaultMode, "dark");
});
