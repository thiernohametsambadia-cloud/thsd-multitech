import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setExpanded(false)
  }

  const closeNav = () => setExpanded(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" expand="lg">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" onClick={closeNav}>
          <img src="/logo.png" alt="THSD Multitech" height="40" className="me-2" />
          <span className="text-primary">THSD</span> Multitech
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbarNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNav} end>Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" onClick={closeNav}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNav}>À propos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/portfolio" onClick={closeNav}>Réalisations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeNav}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/subscribe" onClick={closeNav}>S'abonner</NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin" onClick={closeNav}>
                    <FaTachometerAlt className="me-1" /> Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white text-decoration-none" onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={closeNav}>
                  <FaSignInAlt className="me-1" /> Connexion
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
