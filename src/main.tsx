import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App'
import './index.css'
import { ThemeProvider } from './providers/color-mode-provider'
import { JotaiProvider } from './providers/jotai-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <JotaiProvider>
        <App />
      </JotaiProvider>
    </ThemeProvider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
