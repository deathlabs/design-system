import { expect, test } from "@playwright/test";

test("renders the deathlabs application layout", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByLabel("Classification: UNCLASSIFIED")).toHaveText(
    "UNCLASSIFIED",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Mission Records" }),
  ).toBeVisible();
  const collection = page.getByTestId("record-collection");
  const unitCard = collection
    .getByRole("heading", { name: "NERV Unit-01 Readiness" })
    .locator('xpath=ancestor::div[contains(@class, "MuiCard-root")]');
  await expect(
    collection.getByRole("heading", { name: "Tomb World Awakening" }),
  ).toBeVisible();
  await expect(
    collection.getByRole("heading", { name: "Hive Fleet Behemoth Watch" }),
  ).toBeVisible();
  await expect(
    collection.getByRole("heading", { name: "LV-426 Recovery" }),
  ).toBeVisible();
  await expect(
    collection.getByRole("heading", { name: "Gotham Signal Watch" }),
  ).toBeVisible();

  const search = page.getByRole("textbox", { name: "Search records" });
  await search.fill("Tyranid");
  await expect(
    collection.getByRole("heading", { name: "Hive Fleet Behemoth Watch" }),
  ).toBeVisible();
  await expect(
    collection.getByRole("heading", { name: "NERV Unit-01 Readiness" }),
  ).toHaveCount(0);
  await search.clear();

  await page.getByRole("button", { name: "Create Record" }).click();
  const createdCard = collection
    .getByRole("heading", { name: "Uncatalogued Anomaly 6" })
    .locator('xpath=ancestor::div[contains(@class, "MuiCard-root")]');
  await expect(createdCard).toBeVisible();
  await page
    .getByRole("button", { name: "Edit Uncatalogued Anomaly 6" })
    .click();
  await expect(createdCard.getByText("Active", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Delete Uncatalogued Anomaly 6" })
    .click();
  await expect(
    collection.getByRole("heading", { name: "Uncatalogued Anomaly 6" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);

  const main = page.getByRole("main");
  const sidebarNavigation = page.locator(
    '[aria-label="Sidebar navigation"]:visible',
  );
  const desktopDrawer = sidebarNavigation.locator("..");
  await expect(sidebarNavigation.getByText("Assignments")).toBeVisible();
  await expect(
    page.locator("header").getByRole("button", { name: "Collapse sidebar" }),
  ).toHaveCount(0);
  const expandedMainBox = await main.boundingBox();
  await desktopDrawer.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(
    desktopDrawer.getByRole("button", { name: "Expand sidebar" }),
  ).toBeVisible();
  await expect(main).toHaveCSS("margin-left", "72px");
  await expect(sidebarNavigation.getByText("Assignments")).toBeHidden();
  const collapsedMainBox = await main.boundingBox();
  expect(collapsedMainBox?.x).toBeLessThan(expandedMainBox?.x ?? 0);

  const assignmentsNavigation = sidebarNavigation.getByRole("button", {
    name: "Assignments",
  });
  await assignmentsNavigation.hover();
  await expect(
    page.getByRole("tooltip", { name: "Assignments" }),
  ).toBeVisible();
  await assignmentsNavigation.click();
  await expect(assignmentsNavigation).toHaveAttribute("aria-current", "page");

  await desktopDrawer.getByRole("button", { name: "Expand sidebar" }).click();
  await expect(
    desktopDrawer.getByRole("button", { name: "Collapse sidebar" }),
  ).toBeVisible();
  await expect(main).toHaveCSS("margin-left", "256px");
  await expect(sidebarNavigation.getByText("Assignments")).toBeVisible();

  const userMenuButton = page.getByRole("button", { name: "Open user menu" });
  await expect(userMenuButton).toContainText("Victor Fernandez III");
  await expect(userMenuButton).toContainText("victor@deathlabs.io");

  await userMenuButton.click();

  const userMenu = page.getByRole("menu");
  await expect(userMenu).toBeVisible();
  await expect(userMenu.getByText("Victor Fernandez III")).toBeVisible();
  await expect(userMenu.getByText("victor@deathlabs.io")).toBeVisible();
  await expect(
    userMenu.getByRole("menuitem", { name: "User guide" }),
  ).toBeVisible();
  await expect(
    userMenu.getByRole("menuitem", { name: "Development guide" }),
  ).toBeVisible();
  await expect(
    userMenu.getByRole("menuitem", { name: "Share feedback" }),
  ).toBeVisible();
  await expect(
    userMenu.getByRole("menuitem", { name: "Contact us" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(userMenu).toBeHidden();

  await expect(page.locator("#root > div").first()).toHaveCSS(
    "background-color",
    "rgb(16, 16, 24)",
  );
  await expect(page.locator("header")).toHaveCSS(
    "background-color",
    "rgb(16, 16, 24)",
  );

  await expect(unitCard).toHaveCSS("background-color", "rgb(24, 24, 32)");
  await expect(unitCard).toHaveCSS("border-top-color", "rgb(57, 56, 66)");
  await expect(page.getByRole("switch", { name: "Dark mode" })).toHaveCount(0);
});

test("opens and closes the temporary sidebar on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("button", { name: "Open user menu" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);

  await page.getByRole("button", { name: "Open sidebar" }).click();
  const mobileSidebarNavigation = page.locator(
    '[aria-label="Sidebar navigation"]:visible',
  );
  await expect(mobileSidebarNavigation).toBeVisible();
  await expect(
    mobileSidebarNavigation.getByText("Mission Records"),
  ).toBeVisible();
  await expect(mobileSidebarNavigation.getByText("Assignments")).toBeVisible();
  await expect(mobileSidebarNavigation.getByText("Assets")).toBeVisible();
  await expect(mobileSidebarNavigation.getByText("Activity Log")).toBeVisible();
  await expect(mobileSidebarNavigation.getByText("Archive")).toBeVisible();

  await page.getByRole("button", { name: "Close sidebar" }).click();
  await expect(
    page.locator('[aria-label="Sidebar navigation"]:visible'),
  ).toHaveCount(0);
});
