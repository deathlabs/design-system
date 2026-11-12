import assert from "node:assert/strict";
import test from "node:test";

import {
  AppLayout,
  ClassificationBanner,
  DeathlabsThemeProvider,
  DeathlabsTheme,
} from "../dist/index.js";

test("exports the default deathlabs theme", () => {
  const { palette } = DeathlabsTheme;

  assert.equal(palette.mode, "dark");
  assert.equal(palette.primary.main, "#9250E8");
  assert.equal(palette.primary.contrastText, "#101018");
  assert.equal(palette.secondary.main, "#F554B8");
  assert.equal(palette.secondary.contrastText, "#101018");
  assert.equal(palette.success.main, "#B8FF36");
  assert.equal(palette.success.contrastText, "#101018");
  assert.equal(palette.warning.main, "#FF873D");
  assert.equal(palette.warning.contrastText, "#101018");
  assert.equal(palette.info.main, "#9250E8");
  assert.equal(palette.info.contrastText, "#101018");
  assert.deepEqual(palette.background, {
    default: "#101018",
    paper: "#181820",
  });
  assert.equal(palette.divider, "#393842");
  assert.equal(
    DeathlabsTheme.components.MuiAppBar.defaultProps.color,
    "transparent",
  );
  assert.equal(
    DeathlabsTheme.components.MuiButton.defaultProps.disableElevation,
    true,
  );
  assert.equal(
    DeathlabsTheme.components.MuiCard.defaultProps.variant,
    "outlined",
  );
});

test("exports a provider configured with the deathlabs theme", () => {
  const element = DeathlabsThemeProvider({ children: "content" });

  assert.equal(typeof DeathlabsThemeProvider, "function");
  assert.equal(element.props.theme, DeathlabsTheme);
  assert.equal(element.props.defaultMode, undefined);
});

test("exports the application layout", () => {
  assert.equal(typeof AppLayout, "function");
});

test("renders each supported classification with its standard color", () => {
  const expectedColors = {
    UNCLASSIFIED: "#007A33",
    CUI: "#502B85",
    CONFIDENTIAL: "#0033A0",
    SECRET: "#C8102E",
    "TOP SECRET": "#FF8C00",
    "TOP SECRET // SCI": "#FCE83A",
  };

  for (const [classification, backgroundColor] of Object.entries(
    expectedColors,
  )) {
    const element = ClassificationBanner({ classification });

    assert.equal(element.props.children, classification);
    assert.equal(
      element.props["aria-label"],
      `Classification: ${classification}`,
    );
    assert.equal(element.props.sx[0].backgroundColor, backgroundColor);
  }
});
