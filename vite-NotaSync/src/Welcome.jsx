import './Welcome.css'

export default function Welcome({ onStart }) {
  return (
    <main className="welcome">
      <div className="welcome__bg" aria-hidden="true" />

      <section className="welcome__content">
        <p className="welcome__eyebrow">Productividad Sincronizada</p>
        <h1 className="welcome__title">NotaSync</h1>
        <p className="welcome__pitch">Conecta tus notas con Google Calendar</p>
        <p className="welcome__desc">
          Organiza tus ideas, tareas y notas en un entorno minimalista y sincronízalas
          directamente con tu calendario en tiempo real.
        </p>
        <button
          type="button"
          className="welcome__cta"
          onClick={onStart}
          aria-label="Empezar a crear notas"
        >
          <span>Empezar a crear</span>
          <span className="welcome__cta-arrow" aria-hidden="true">→</span>
        </button>
      </section>

      <section className="welcome__stamp" aria-hidden="true">
        <div className="stamp__note">
          <span className="stamp__note-line" />
          <span className="stamp__note-line" />
          <span className="stamp__note-line stamp__note-line--short" />
        </div>

        <svg className="stamp__link" viewBox="0 0 160 60" fill="none">
          <path
            className="stamp__link-path"
            d="M8,10 C60,10 60,50 152,50"
          />
          <circle className="stamp__link-dot" r="4" />
        </svg>

        <div className="stamp__calendar">
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
