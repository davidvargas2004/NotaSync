import '../styles/Welcome.css'

export default function Welcome({ onStart }) {
  return (
    <main id="inicio" className="welcome">
      <div className="welcome__bg" aria-hidden="true" />

      {/* Hero Content */}
      <section className="welcome__content">
        <div className="welcome__eyebrow">
          <span className="welcome__eyebrow-dot" aria-hidden="true" />
          <span>Productividad Sincronizada</span>
        </div>

        <h1 className="welcome__title">NotaSync</h1>
        <p className="welcome__pitch">Conecta tus notas con Google Calendar</p>

        <p className="welcome__desc">
          Organiza tus ideas, tareas y notas en un entorno de tinta minimalista y
          sincronízalas automáticamente con tus eventos y recordatorios de Google Calendar.
        </p>

        <div className="welcome__cta-group">
          <button
            type="button"
            className="welcome__cta"
            onClick={onStart}
            aria-label="Empezar a crear notas"
          >
            <span>Empezar a crear</span>
            <span className="welcome__cta-arrow" aria-hidden="true">→</span>
          </button>

          <a href="#funciones" className="welcome__cta-secondary">
            Ver cómo funciona ↓
          </a>
        </div>
      </section>

      {/* Sello de Sincronización (Metáfora visual Notas + Calendario) */}
      <section id="sincronizacion" className="welcome__stamp" aria-label="Sello de sincronización entre notas y calendario">
        {/* Nota flotante */}
        <div className="stamp__note" aria-hidden="true">
          <div className="stamp__note-tag" />
          <span className="stamp__note-line" />
          <span className="stamp__note-line" />
          <span className="stamp__note-line stamp__note-line--short" />
        </div>

        {/* Línea animada SVG */}
        <svg className="stamp__link" viewBox="0 0 160 64" fill="none" aria-hidden="true">
          <path
            className="stamp__link-path"
            d="M8,12 C60,12 60,52 152,52"
          />
          <circle className="stamp__link-dot" r="4.5" />
        </svg>

        {/* Mini Calendario */}
        <div className="stamp__calendar" aria-hidden="true">
          <div className="stamp__calendar-head">
            <span />
            <span />
          </div>
          <div className="stamp__calendar-grid">
            <div className="stamp__calendar-cell is-active" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell is-active" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell" />
            <div className="stamp__calendar-cell is-active" />
          </div>
        </div>
      </section>
    </main>
  )
}
