import { FOOTER_COLUMNS } from '../data/footerColumns'
import { SOCIAL_LINKS } from '../data/socialLinks'
import { SocialIcon } from './icons'
import '../styles/Footer.css'

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Brand & Social Column */}
        <div className="footer__brand-col">
          <div className="footer__brand-name">
            <span>NotaSync</span>
            <span className="footer__brand-dot" aria-hidden="true" />
          </div>
          <p className="footer__brand-tagline">
            La plataforma inteligente para sincronizar tus notas diarias con Google Calendar
            de forma automática, segura y fluida.
          </p>

          <ul className="footer__social" aria-label="Redes sociales">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <SocialIcon name={item.name} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Nav Columns */}
        <div className="footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="footer__column">
              <h3 className="footer__column-title">{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright & Bottom Info */}
      <div className="footer__bottom">
        <p>© {getCurrentYear()} NotaSync. Todos los derechos reservados.</p>
        <div className="footer__bottom-links">
          <a href="#privacidad">Privacidad</a>
          <a href="#terminos">Términos</a>
          <a href="#seguridad">Seguridad</a>
        </div>
      </div>
    </footer>
  )
}
