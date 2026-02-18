import { Link, useLocation } from 'react-router-dom'
import '../styles/Nav.css'

function Nav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="nav">
      <Link 
        to="/" 
        className={`nav-link ${isActive('/') ? 'active' : ''}`}
      >
        Inicio
      </Link>
      <Link 
        to="/nuestros-wraps" 
        className={`nav-link ${isActive('/nuestros-wraps') ? 'active' : ''}`}
      >
        Nuestros wraps
      </Link>
      <Link 
        to="/testimonios" 
        className={`nav-link ${isActive('/testimonios') ? 'active' : ''}`}
      >
        Testimonios
      </Link>
      <Link 
        to="/contacto" 
        className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
      >
        Contacto
      </Link>
    </nav>
  )
}

export default Nav