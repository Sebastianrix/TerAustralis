import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './HomePage'
import BuildersPage from './BuildersPage'

// Reset scroll on route change (anchors within a page still work as usual).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builders" element={<BuildersPage />} />
      </Routes>
    </>
  )
}
