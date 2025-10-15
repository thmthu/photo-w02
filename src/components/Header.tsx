import { Link } from 'react-router-dom'

/**
 * Header / Navbar
 * - Purpose: show app brand and primary navigation links
 * - Layout note: uses Bootstrap `container-fluid` so the navbar background spans
 *   the full viewport width while inner content is padded to align with page content.
 */
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top w-100 ">
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between py-3">
        <p className="navbar-brand mb-0 h1 text-primary">Picsum Gallery</p>
      </div>
    </nav>
  )
}
