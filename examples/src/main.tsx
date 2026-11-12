import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { DeathlabsThemeProvider } from '@deathlabs/design-system'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeathlabsThemeProvider>
      <App />
    </DeathlabsThemeProvider>
  </StrictMode>,
)
