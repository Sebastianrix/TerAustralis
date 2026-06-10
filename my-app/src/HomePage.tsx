// PLACEHOLDER — to be replaced with the HomePage.tsx authored in the design
// handover (advocacy-first landing page). Kept minimal so routing compiles.
import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home">
      <h1>TerAustralis</h1>
      <p>New homepage content pending.</p>
      <Link to="/builders">For Builders →</Link>
    </div>
  )
}
