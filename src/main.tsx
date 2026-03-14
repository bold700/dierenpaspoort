import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'nes.css/css/nes.min.css'
import App from './App'
import './index.css'
import { ErrorFallback } from './components/ErrorFallback'

const baseUrl = typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/'
const basename = baseUrl.replace(/\/$/, '') || undefined

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML = '<div style="padding:1rem;background:#212529;color:#e0e0e0;font-family:system-ui">Geen root-element gevonden.</div>'
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorFallback>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </ErrorFallback>
      </StrictMode>
    )
  } catch (err) {
    console.error('Dierenpaspoort startfout:', err)
    rootEl.innerHTML = `
      <div style="min-height:100vh;background:#212529;color:#e0e0e0;padding:1.5rem;font-family:system-ui;text-align:center">
        <p style="color:#e76e55">De app kon niet starten.</p>
        <p style="margin-top:1rem"><a href="." style="color:#209cee">Pagina herladen</a></p>
      </div>
    `
  }
}
