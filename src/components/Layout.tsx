import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" className="app-main">
        <Suspense fallback={<div className="wrap route-fallback">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
