import googleCalendarLogo from '../assets/google_calendar_logo_icon_159345.webp'
import '../styles/GoogleCalendar.css'

export default function GoogleCalendar({ onBack, onStartSync }) {
  return (
    <main className="calendar-page" id="google-calendar-view">
      <div className="calendar-page__bg" aria-hidden="true" />

      <div className="calendar-page__inner">
        {/* Contenido descriptivo */}
        <section className="calendar-page__content">
          <button
            type="button"
            className="calendar-page__back"
            onClick={onBack}
            aria-label="Volver a la página de inicio"
          >
            <span aria-hidden="true">←</span>
            <span>Volver al inicio</span>
          </button>

          <div className="calendar-page__eyebrow">
            <span>●</span>
            <span>Integración Oficial Google</span>
          </div>

          <h1 className="calendar-page__title">
            Tus notas cobran vida en Google Calendar
          </h1>

          <p className="calendar-page__pitch">
            Sincronización instantánea entre tu flujo de pensamiento y tu agenda.
          </p>

          <p className="calendar-page__desc">
            NotaSync se conecta directamente mediante la API de Google Calendar. Cada tarea,
            cita o recordatorio que anotes se transforma automáticamente en un evento organizado,
            sin fricción ni pasos manuales.
          </p>

          {/* Tarjetas de características */}
          <div className="calendar-page__features">
            <article className="calendar-feature-card">
              <h3 className="calendar-feature-card__title">Sync Bidireccional</h3>
              <p className="calendar-feature-card__text">
                Los cambios en tus notas se reflejan de inmediato en tu calendario y viceversa.
              </p>
            </article>

            <article className="calendar-feature-card">
              <h3 className="calendar-feature-card__title">Detección de Fechas</h3>
              <p className="calendar-feature-card__text">
                Escribe "reunión mañana 4pm" y NotaSync creará el evento automáticamente.
              </p>
            </article>

            <article className="calendar-feature-card">
              <h3 className="calendar-feature-card__title">Notificaciones en Vivo</h3>
              <p className="calendar-feature-card__text">
                Recibe alertas en todos tus dispositivos sincronizados con tu cuenta de Google.
              </p>
            </article>

            <article className="calendar-feature-card">
              <h3 className="calendar-feature-card__title">Privacidad Total</h3>
              <p className="calendar-feature-card__text">
                Autenticación segura OAuth 2.0. Tus datos nunca salen de tu entorno protegido.
              </p>
            </article>
          </div>

          {/* Acciones */}
          <div className="calendar-page__actions">
            <button
              type="button"
              className="calendar-page__cta-primary"
              onClick={onStartSync}
              aria-label="Autorizar y sincronizar con Google Calendar"
            >
              <span>Vincular Cuenta de Google</span>
              <span aria-hidden="true">⚡</span>
            </button>
          </div>
        </section>

        {/* Presentación visual con Logo y Animaciones Livianas */}
        <section className="calendar-visual" aria-label="Visualización de la integración tecnológica">
          {/* Anillos orbitales animados */}
          <div className="calendar-visual__orbit calendar-visual__orbit--outer" aria-hidden="true">
            <span className="calendar-visual__orbit-dot" />
          </div>
          <div className="calendar-visual__orbit calendar-visual__orbit--inner" aria-hidden="true">
            <span className="calendar-visual__orbit-dot calendar-visual__orbit-dot--secondary" />
          </div>

          {/* Badges interactivos flotantes */}
          <div className="calendar-visual__badge calendar-visual__badge--top">
            <span className="calendar-visual__badge-pulse" />
            <span>Google Calendar API v3</span>
          </div>

          <div className="calendar-visual__badge calendar-visual__badge--bottom">
            <span>⚡ Sincronización en tiempo real</span>
          </div>

          {/* Logo central con efecto flotante */}
          <div className="calendar-visual__center">
            <img
              src={googleCalendarLogo}
              alt="Logo oficial de Google Calendar sincronizado con NotaSync"
              className="calendar-visual__img"
              width="93"
              height="93"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
