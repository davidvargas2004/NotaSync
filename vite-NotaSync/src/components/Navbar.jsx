import { useState } from 'react'
import { NAV_LINKS } from '../data/navLinks'
import { CalendarIcon } from './icons'
import '../styles/Navbar.css'

export default function Navbar({
  onConnectGoogle,
  onNavigateHome,
  onNavigateCrear,
  onNavigatePendientes,
  pendingCount = 0
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const handleLinkClick = (href, e) => {
    setIsOpen(false)
    if (href === '#inicio') {
      e.preventDefault()
      if (onNavigateHome) onNavigateHome()
    } else if (href === '#crear') {
      e.preventDefault()
      if (onNavigateCrear) onNavigateCrear()
    } else if (href === '#pendientes') {
      e.preventDefault()
      if (onNavigatePendientes) onNavigatePendientes()
    } else if (href === '#sincronizacion') {
      e.preventDefault()
      if (onConnectGoogle) onConnectGoogle()
    }
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (onNavigateHome) {
      onNavigateHome()
    }
  }

  const handleConnect = () => {
    setIsOpen(false)
    if (onConnectGoogle) {
      onConnectGoogle()
    }
  }

  const renderLinks = () => (
    <ul>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={(e) => handleLinkClick(link.href, e)}
          >
            <span>{link.label}</span>
            {link.href === '#pendientes' && pendingCount > 0 && (
              <span className={`navbar__badge ${pendingCount > 10 ? 'navbar__badge--alert' : ''}`}>
                {pendingCount}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a
          href="#inicio"
          className="navbar__brand"
          onClick={handleBrandClick}
          aria-label="NotaSync Inicio"
        >
          <span>NotaSync</span>
          <span className="navbar__brand-dot" aria-hidden="true" />
        </a>

        {/* Desktop Links */}
        <nav className="navbar__links--desktop" aria-label="Navegación principal">
          {renderLinks()}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__cta"
            onClick={handleConnect}
            aria-label="Conectar Google Calendar"
          >
            <CalendarIcon size={16} />
            <span>Conectar Google Calendar</span>
          </button>

          <button
            type="button"
            className={`navbar__toggle ${isOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <nav
        className={`navbar__links--mobile ${isOpen ? 'is-open' : ''}`}
        aria-label="Navegación móvil"
      >
        {renderLinks()}
        <div style={{ padding: '0 clamp(1.25rem, 5vw, 3rem) 1.5rem' }}>
          <button
            type="button"
            className="navbar__cta navbar__cta--mobile"
            onClick={handleConnect}
          >
            <CalendarIcon size={16} />
            <span>Conectar Google Calendar</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
