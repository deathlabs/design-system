# `@deathlabs/design-system`

The web package provides an opinionated Material UI theme, application layout, and classification banner for Deathlabs applications.

## Installation

```bash
npm install @deathlabs/design-system @emotion/react @emotion/styled @mui/icons-material @mui/material react react-dom
```

## Usage

Wrap the application with the theme provider:

```tsx
import { DeathlabsThemeProvider } from "@deathlabs/design-system";

export function Root() {
  return (
    <DeathlabsThemeProvider>
      <App />
    </DeathlabsThemeProvider>
  );
}
```

The package exports `AppLayout`, `ClassificationBanner`, `DeathlabsThemeProvider`, their related types, and the Deathlabs theme.

## Development

From the repository root, use `make build`, `make check`, and `make test`. Run `make dev` to start the example application.
