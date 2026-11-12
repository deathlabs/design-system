import { expect, test } from '@playwright/test'

test('toggles the theme from dark mode to light mode', async ({ page }, testInfo) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /compact workspace/i })).toBeVisible()

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

  const pageSurface = page.locator('#root > div').first()
  const darkModeToggle = page.getByRole('switch', { name: 'Dark mode' })

  await expect(pageSurface).toHaveCSS('background-color', 'rgb(18, 19, 20)')
  await expect(darkModeToggle).toBeChecked()

  await darkModeToggle.uncheck()

  await expect(pageSurface).toHaveCSS('background-color', 'rgb(255, 244, 232)')
  await expect(darkModeToggle).not.toBeChecked()

  await page.screenshot({
    path: testInfo.outputPath('light-mode.png'),
    fullPage: true,
  })
})
