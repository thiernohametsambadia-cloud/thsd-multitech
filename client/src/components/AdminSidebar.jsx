import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaEnvelope, FaCogs, FaUsers, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="admin-sidebar bg-dark text-white d-flex flex-column">
      <div className="p-3 border-bottom border-secondary">
        <h6 className="fw-bold mb-0"><span className="text-primary">THSD</span> Admin</h6>
      </div>
      <nav className="flex-grow-1 p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-1">
            <NavLink to="/admin" end className="nav-link text-white">
              <FaTachometerAlt className="me-2" />Tableau de bord
            </NavLink>
          </li>
          <li className="nav-item mb-1">
            <NavLink to="/admin/messages" className="nav-link text-white">
              <FaEnvelope className="me-2" />Messages
            </NavLink>
          </li>
          <li className="nav-item mb-1">
            <NavLink to="/admin/services" className="nav-link text-white">
              <FaCogs className="me-2" />Services
            </NavLink>
          </li>
          <li className="nav-item mb-1">
            <NavLink to="/admin/subscribers" className="nav-link text-white">
              <FaUsers className="me-2" />Abonnés
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-3 border-top border-secondary">
        <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />Déconnexion
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
