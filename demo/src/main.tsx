import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { DeathlabsThemeProvider } from '@deathlabs/mui-theme-provider'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeathlabsThemeProvider>
      <App />
    </DeathlabsThemeProvider>
  </StrictMode>,
)
