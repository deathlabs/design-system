import { expect, test } from '@playwright/test'

test('renders the deathlabs application layout', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('Classification: UNCLASSIFIED')).toHaveText('UNCLASSIFIED')
  await expect(page.getByRole('heading', { level: 1, name: 'Deathlabs Design System' })).toBeVisible()
  const overview = page.getByTestId('design-system-overview')
  await expect(overview.getByRole('heading', { name: 'DeathlabsThemeProvider' })).toBeVisible()
  await expect(overview.getByRole('heading', { name: 'AppLayout' })).toBeVisible()
  await expect(overview.getByRole('heading', { name: 'ClassificationBanner' })).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  ).toBe(false)

  const main = page.getByRole('main')
  const sidebarNavigation = page.locator('[aria-label="Sidebar navigation"]:visible')
  const desktopDrawer = sidebarNavigation.locator('..')
  await expect(sidebarNavigation.getByText('App Layout')).toBeVisible()
  await expect(page.locator('header').getByRole('button', { name: 'Collapse sidebar' })).toHaveCount(
    0,
  )
  const expandedMainBox = await main.boundingBox()
  await desktopDrawer.getByRole('button', { name: 'Collapse sidebar' }).click()
  await expect(desktopDrawer.getByRole('button', { name: 'Expand sidebar' })).toBeVisible()
  await expect(main).toHaveCSS('margin-left', '72px')
  await expect(sidebarNavigation.getByText('App Layout')).toBeHidden()
  const collapsedMainBox = await main.boundingBox()
  expect(collapsedMainBox?.x).toBeLessThan(expandedMainBox?.x ?? 0)

  const appLayoutNavigation = sidebarNavigation.getByRole('button', { name: 'App Layout' })
  await appLayoutNavigation.hover()
  await expect(page.getByRole('tooltip', { name: 'App Layout' })).toBeVisible()
  await appLayoutNavigation.click()
  await expect(appLayoutNavigation).toHaveAttribute('aria-current', 'page')

  await desktopDrawer.getByRole('button', { name: 'Expand sidebar' }).click()
  await expect(desktopDrawer.getByRole('button', { name: 'Collapse sidebar' })).toBeVisible()
  await expect(main).toHaveCSS('margin-left', '256px')
  await expect(sidebarNavigation.getByText('App Layout')).toBeVisible()

  const userMenuButton = page.getByRole('button', { name: 'Open user menu' })
  await expect(userMenuButton).toContainText('Victor Fernandez III')
  await expect(userMenuButton).toContainText('victor@deathlabs.io')

  await userMenuButton.click()

  const userMenu = page.getByRole('menu')
  await expect(userMenu).toBeVisible()
  await expect(userMenu.getByText('Victor Fernandez III')).toBeVisible()
  await expect(userMenu.getByText('victor@deathlabs.io')).toBeVisible()
  await expect(userMenu.getByRole('menuitem', { name: 'User guide' })).toBeVisible()
  await expect(userMenu.getByRole('menuitem', { name: 'Development guide' })).toBeVisible()
  await expect(userMenu.getByRole('menuitem', { name: 'Share feedback' })).toBeVisible()
  await expect(userMenu.getByRole('menuitem', { name: 'Contact us' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(userMenu).toBeHidden()

  await expect(page.locator('#root > div').first()).toHaveCSS('background-color', 'rgb(16, 16, 24)')
  await expect(page.locator('header')).toHaveCSS('background-color', 'rgb(16, 16, 24)')

  await expect(overview).toHaveCSS('background-color', 'rgb(24, 24, 32)')
  await expect(overview).toHaveCSS('border-top-color', 'rgb(57, 56, 66)')
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toHaveCount(0)
})

test('opens and closes the temporary sidebar on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Open user menu' })).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  ).toBe(false)

  await page.getByRole('button', { name: 'Open sidebar' }).click()
  const mobileSidebarNavigation = page.locator('[aria-label="Sidebar navigation"]:visible')
  await expect(mobileSidebarNavigation).toBeVisible()
  await expect(mobileSidebarNavigation.getByText('Overview')).toBeVisible()
  await expect(mobileSidebarNavigation.getByText('App Layout')).toBeVisible()
  await expect(mobileSidebarNavigation.getByText('Classification Banner')).toBeVisible()

  await page.getByRole('button', { name: 'Close sidebar' }).click()
  await expect(page.locator('[aria-label="Sidebar navigation"]:visible')).toHaveCount(0)
})
