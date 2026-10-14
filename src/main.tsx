import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'lenis/dist/lenis.css'
import './index.css'

// Refreshes should start at the Hero instead of restoring the last scroll position.
window.history.scrollRestoration = 'manual'

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
if (navigation?.type === 'reload' && window.location.hash) {
  // An old section anchor must not scroll the refreshed page down after it loads.
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
