# Recreating the `deathlabs` Design System

This document explains how the Material UI components within this design system were developed. This document was created to help others create their own Material UI components and design system.

## Create the Repository

**Step 1.** Create the repository directory.

```bash
mkdir design-system
cd design-system
```

**Step 2.** Initialize the Git repository.

```bash
git init
```

**Step 3.** Create the `.gitignore` file.

```gitignore
node_modules/
dist/
.vite/
storybook-static/
*-sbom.json
```

**Step 4.** Create the root README file.

```markdown
# `design-system`

The `deathlabs` design system.
```

## Configure the Package

**Step 1.** Create the npm package manifest.

```bash
npm init -y
```

**Step 2.** Set the package name.

```bash
npm pkg set name="@deathlabs/design-system"
```

**Step 3.** Configure the package as an ECMAScript module.

```bash
npm pkg set type="module"
```

**Step 4.** Allow publication of the package.

```bash
npm pkg set private=false --json
```

The `--json` option stores `false` as a Boolean value.

**Step 5.** Set the initial development version.

```bash
npm pkg set version="0.1.0"
```

To confirm the version, use the command below.

```bash
npm pkg get version
```

## Install the Build Tools

**Step 1.** Install TypeScript and Vite.

```bash
npm install --save-dev typescript vite @vitejs/plugin-react vite-plugin-dts
```

**Step 2.** Install React for local development.

```bash
npm install --save-dev react react-dom @types/react @types/react-dom
```

**Step 3.** Install Material UI for local development.

```bash
npm install --save-dev @mui/material @emotion/react @emotion/styled
```

## Configure Peer Dependencies

Peer dependencies prevent applications from loading duplicate React or Material UI packages.

**Step 1.** Add React as a peer dependency.

```bash
npm pkg set 'peerDependencies.react=^18.0.0 || ^19.0.0'
npm pkg set 'peerDependencies.react-dom=^18.0.0 || ^19.0.0'
```

**Step 2.** Add Material UI and Emotion as peer dependencies.

```bash
npm pkg set 'peerDependencies.@mui/material=^9.0.0'
npm pkg set 'peerDependencies.@emotion/react=^11.0.0'
npm pkg set 'peerDependencies.@emotion/styled=^11.0.0'
```

Use the Material UI major version that the `deathlabs` applications use.

## Configure Storybook

Storybook provides an isolated environment for component development and documentation.

**Step 1.** Verify that Node.js 20 or a later version is installed.

```bash
node --version
```

**Step 2.** Initialize Storybook in the repository.

```bash
npm create storybook@latest
```

**Step 3.** Enter `y` when npm requests permission to install `create-storybook`.

**Step 4.** Confirm that Storybook detects the `react-vite` framework.

If Storybook requests a framework, select React with Vite.

**Step 5.** Select `No: Skip onboarding & don't ask again` for the onboarding option.

**Step 6.** Select `Recommended: Component development, docs, and testing features` for the configuration.

**Step 7.** Select `No` when Storybook offers AI features.

**Step 8.** Select `Yes` when Storybook offers to install Playwright with Chromium.

Playwright supports the browser-based component, interaction, and accessibility tests.

**Step 9.** Start the Storybook development server.

```bash
npm run storybook
```

**Step 10.** Verify that Storybook opens correctly in the browser.

**Step 11.** Press `Ctrl+C` in the terminal to stop the Storybook development server.

**Step 12.** Verify that Storybook can create a static build.

```bash
npm run build-storybook
```

The build command exits automatically after it creates the `storybook-static` directory.

The installer creates a top-level `stories` directory with example components and stories.

Use these examples only to verify the Storybook installation.

## Add the First Component

Keep each story in the same directory as its component.

**Step 1.** Create the Button component directory and source files.

```bash
mkdir -p src/components/Button
touch src/components/Button/Button.tsx
touch src/components/Button/Button.stories.tsx
touch src/components/Button/index.ts
touch src/components/index.ts
touch src/index.ts
```

The commands above create the following source layout.

```text
src/
├── components/
│   ├── Button/
│   │   ├── Button.stories.tsx
│   │   ├── Button.tsx
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

**Step 2.** Implement the Button component in `src/components/Button/Button.tsx`.

```tsx
export { default as Button } from '@mui/material/Button';
export type { ButtonProps } from '@mui/material/Button';
```

This implementation preserves the Material UI Button API without changing its behavior.

**Step 3.** Add the Button story to `src/components/Button/Button.stories.tsx`.

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};
```

These stories display the contained, outlined, and text Button variants.

**Step 4.** Configure `.storybook/main.ts` to find stories beside their components.

```ts
"stories": [
  '../src/**/*.mdx',
  '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
],
```

**Step 5.** Start the Storybook development server.

```bash
npm run storybook
```

**Step 6.** Verify that Storybook displays the Button story. Open `http://localhost:6006` if Storybook does not open a browser automatically. Select **Components**, and then select **Button** in the sidebar. Verify the Contained, Outlined, and Text stories. Use the Controls panel to change the Button properties.

**Step 7.** Press `Ctrl+C` in the terminal to stop the Storybook development server.

**Step 8.** After Storybook displays the Button story, remove the generated top-level `stories` directory. Deleting this directory around until now helps prevent Storybook from running without a discoverable story during the transition.

```bash
rm -r stories
```

**Step 9.** Export the Button from each `index.ts` file.

Add the following export to `src/components/Button/index.ts`.

```ts
export * from './Button';
```

Add the following export to `src/components/index.ts`.

```ts
export * from './Button';
```

Add the following export to `src/index.ts`.

```ts
export * from './components';
```

These exports make the Button available from the package root.

**Step 10.** Create `tsconfig.json` in the repository root.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

This configuration enables strict JSX checks and declaration generation for files in `src`.

**Step 11.** Create `vite.config.ts` in the repository root.

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const peerDependencies = [
  'react',
  'react-dom',
  '@mui/material',
  '@emotion/react',
  '@emotion/styled',
];

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (id) =>
        peerDependencies.some(
          (dependency) => id === dependency || id.startsWith(`${dependency}/`),
        ),
    },
  },
});
```

Vite builds the package from `src/index.ts` and writes JavaScript to `dist`.

The declaration plugin writes TypeScript declarations and keeps peer dependencies outside the bundle.

**Step 12.** Add the library build command to `package.json` using the command below.

```bash
npm pkg set scripts.build="vite build"
```

The command adds the following entry to the `scripts` object.

```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

**Step 13.** Configure the package entry points.

```bash
npm pkg set main="./dist/index.js"
npm pkg set types="./dist/index.d.ts"
npm pkg set 'exports[.].types=./dist/index.d.ts'
npm pkg set 'exports[.].import=./dist/index.js'
npm pkg set 'files[0]=dist'
```

These commands identify the files that applications import from the published package.

**Step 14.** Run the library build.

```bash
npm run build
```

**Step 15.** Verify that Vite creates `dist/index.js` and `dist/index.d.ts`.

**Step 16.** Verify that Storybook can create a static build with the Button story.

```bash
npm run build-storybook
```

The build command exits automatically and creates the ignored `storybook-static` directory.

## Add the Theme Provider

Use one provider to apply the dark `deathlabs` theme and `CssBaseline` to each application.

**Step 1.** Create the theme module files.

```bash
mkdir -p src/theme
touch src/theme/theme.ts
touch src/theme/theme.types.ts
touch src/theme/tokens.ts
touch src/theme/DeathlabsThemeProvider.tsx
touch src/theme/DeathlabsThemeProvider.stories.tsx
touch src/theme/index.ts
```

**Step 2.** Add the custom token types to `src/theme/theme.types.ts`.

```ts
export interface DeathlabsThemeTokens {
  colors: {
    ember: string;
    raisedSurface: string;
  };
  shadows: {
    glow: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    deathlabs: DeathlabsThemeTokens;
  }

  interface ThemeOptions {
    deathlabs?: DeathlabsThemeTokens;
  }
}
```

**Step 3.** Add the custom token values to `src/theme/tokens.ts`.

```ts
import type { DeathlabsThemeTokens } from './theme.types';

export const deathlabsTokens = {
  colors: {
    ember: '#4D1E4A',
    raisedSurface: '#3F3542',
  },
  shadows: {
    glow: '0 0 12px rgba(224,87,201,0.7)',
  },
} satisfies DeathlabsThemeTokens;
```

**Step 4.** Create the dark theme in `src/theme/theme.ts`.

```ts
import { createTheme } from '@mui/material/styles';

import { deathlabsTokens } from './tokens';

const deathlabsTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#261D29',
      paper: '#342B37',
    },
    primary: {
      main: '#54485A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E057C9',
    },
    divider: 'rgba(255,255,255,0.07)',
  },
  deathlabs: deathlabsTokens,
});

export default deathlabsTheme;
```

**Step 5.** Implement `DeathlabsThemeProvider` in `src/theme/DeathlabsThemeProvider.tsx`.

```tsx
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

import deathlabsTheme from './theme';

export interface DeathlabsThemeProviderProps {
  children: ReactNode;
}

export function DeathlabsThemeProvider({ children }: DeathlabsThemeProviderProps) {
  return (
    <ThemeProvider theme={deathlabsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

**Step 6.** Add a provider story with a themed child component.

Store the story in `src/theme/DeathlabsThemeProvider.stories.tsx`.

Verify the palette and custom token values in the story play function.

**Step 7.** Export the provider, theme, token values, and token types from `src/theme/index.ts`.

```ts
export * from './DeathlabsThemeProvider';
export { default as deathlabsTheme } from './theme';
export type { DeathlabsThemeTokens } from './theme.types';
export * from './tokens';
```

**Step 8.** Export the theme module from `src/index.ts`.

```ts
export * from './components';
export * from './theme';
```

**Step 9.** Add `DeathlabsThemeProvider` as a global decorator in `.storybook/preview.tsx`.

This decorator applies the same baseline theme to every component story.

## Use the First Component

Use an example application to verify the package in the same repository.

**Step 1.** Create a React and Vite application in `examples/vite-react-ts`.

```bash
npm create vite@latest examples/vite-react-ts -- --template react-ts
```

The command creates both `examples` and `examples/vite-react-ts` when the directories do not exist.

**Step 2.** Select `Oxlint` when Vite requests a linter.

**Step 3.** Select `No` when Vite offers to install dependencies and start the server.

If you select `Yes`, press `Ctrl+C` after the server starts.

Vite installs the dependencies when you select `Yes`. Skip Step 5 in this case.

**Step 4.** Change to the example application directory.

```bash
cd examples/vite-react-ts
```

**Step 5.** Install the example application dependencies.

```bash
npm install
```

**Step 6.** Install the local `@deathlabs/design-system` package.

```bash
npm install ../..
```

This command adds the repository root as a file dependency in the example application.

**Step 7.** Install the Material UI and Emotion peer dependencies.

```bash
npm install @mui/material @emotion/react @emotion/styled
```

The example application must supply these packages because the design system declares them as peer dependencies.

**Step 8.** Configure `vite.config.ts` to share one copy of each runtime dependency.

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
});
```

This configuration prevents invalid hook calls when Vite loads the locally linked design system.

**Step 9.** Replace the contents of `src/App.tsx` with the Button example.

```tsx
import { Button, DeathlabsThemeProvider } from '@deathlabs/design-system';

export default function App() {
  return (
    <DeathlabsThemeProvider>
      <Button variant="contained">Save</Button>
    </DeathlabsThemeProvider>
  );
}
```

The application supplies React, Material UI, and Emotion through the configured peer dependencies.

**Step 10.** Start the example application.

```bash
npm run dev
```

**Step 11.** Verify that the browser displays the `deathlabs` Button.

**Step 12.** Press `Ctrl+C` in the terminal to stop the example application.

## Develop More Components

Repeat the following workflow for each component after the Button.

**Step 1.** Create a component directory with the component, story, and export files.

```text
src/components/ComponentName/
├── ComponentName.stories.tsx
├── ComponentName.tsx
└── index.ts
```

**Step 2.** Implement or re-export the Material UI component.

Preserve the Material UI API until the design system needs different behavior.

**Step 3.** Add stories for the supported variants, sizes, states, and interactions.

**Step 4.** Export the component from its `index.ts` file and `src/components/index.ts`.

The root `src/index.ts` file already exports all components through `src/components/index.ts`.

**Step 5.** Start Storybook from the repository root.

```bash
npm run storybook
```

**Step 6.** Verify the component stories, Controls, interactions, and accessibility results.

**Step 7.** Press `Ctrl+C` in the terminal to stop Storybook.

**Step 8.** Import the component into `examples/vite-react-ts/src/App.tsx`.

**Step 9.** Start the library watcher and example application from the repository root.

```bash
make dev
```

The command builds the library, watches source changes, and starts the example application.

**Step 10.** Edit the component and verify that the example application updates.

**Step 11.** Press `Ctrl+C` in the terminal to stop the watcher and example application.

**Step 12.** Verify the static Storybook build.

```bash
npm run build-storybook
```

This loop validates each component in isolation and through the packaged library.

## Version and Publish the Package

Use Semantic Versioning to communicate the effect of each release.

* Run `npm version patch` for backward-compatible fixes and style corrections.
* Run `npm version minor` for new components and backward-compatible features.
* Run `npm version major` for removed exports, renamed props, and other breaking changes.

Keep the package below `1.0.0` until its API and release process are stable.

**Step 1.** Verify that the Git worktree is clean.

```bash
git status --short
```

Commit or remove unexpected changes before you create a version.

**Step 2.** Verify the library and Storybook builds.

```bash
npm run build
npm run build-storybook
```

**Step 3.** Create one release version.

Run only one command for each release.

```bash
npm version patch
```

Replace `patch` with `minor` or `major` when the release requires that version change. The command updates `package.json` and `package-lock.json`. It also creates a Git commit and tag.

**Step 4.** Publish the scoped package to the package registry.

```bash
npm publish --access public
```

## Use the Published Package

After the library is published, applications can install it from the package registry.

```bash
npm install @deathlabs/design-system
```
