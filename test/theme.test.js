import assert from "node:assert/strict";
import test from "node:test";

import { DeathlabsThemeProvider, DeathlabsTheme } from "../dist/index.js";

test("exports the default deathlabs theme", () => {
  assert.equal(DeathlabsTheme.palette.mode, "light");
  assert.equal(DeathlabsTheme.palette.primary.main, "#1976d2");
});

test("exports a provider configured with the deathlabs theme", () => {
  const element = DeathlabsThemeProvider({ children: "content" });

  assert.equal(typeof DeathlabsThemeProvider, "function");
  assert.equal(element.props.theme, DeathlabsTheme);
});
