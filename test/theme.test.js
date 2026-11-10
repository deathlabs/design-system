import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DeathlabsThemeProvider,
  deathlabsTheme,
} from '../dist/index.js';

test('exports the default Deathlabs theme', () => {
  assert.equal(deathlabsTheme.palette.mode, 'light');
  assert.equal(deathlabsTheme.palette.primary.main, '#1976d2');
});

test('exports a provider configured with the Deathlabs theme', () => {
  const element = DeathlabsThemeProvider({ children: 'content' });

  assert.equal(typeof DeathlabsThemeProvider, 'function');
  assert.equal(element.props.theme, deathlabsTheme);
});
