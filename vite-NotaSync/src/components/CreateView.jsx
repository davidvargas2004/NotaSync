import { useState } from 'react'
import { formatEventDate } from '../data/mockEvents'
import { CalendarIcon, ClockIcon, MapPinIcon, CheckIcon, ArrowLeftIcon } from './icons'
import './CreateView.css'

/**
 * Vista "Empezar a crear" — Renderizado de eventos precargados
 * Cumple con principios de inmutabilidad (Spread Operator), destructuring y cero código repetido.
 */
const CreateView = ({ events = [], onBack }) => {
  // Estado local para mutaciones inmutables de los eventos precargados
  const [eventList, setEvents] = useState(events)

  /**
   * Marca un evento como enviado a Google Calendar usando Spread Operator para inmutabilidad
   */
  const marcarEnviado = (id) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? { ...ev, enviadoACalendar: true }
          : ev
      )
    )
  }

  // Cálculos derivados usando arrow functions
  const totalEventos = eventList.length
  const enviadosCount = eventList.filter((ev) => ev.enviadoACalendar).length
  const pendientesCount = totalEventos - enviadosCount

  return (
    <main className="create-view">
      <div className="create-view__container">
        {/* Encabezado y Navegación de la Vista */}
        <header className="create-view__header">
          <div className="create-view__nav-bar">
            {onBack && (
              <button
                type="button"
                className="create-view__back-btn"
                onClick={onBack}
                aria-label="Volver al inicio"
              >
                <ArrowLeftIcon size={16} />
                <span>Volver al inicio</span>
              </button>
            )}
            <div className="create-view__badge-tag">
              <span className="create-view__dot" aria-hidden="true" />
              <span>Modo Exploración de Eventos</span>
            </div>
          </div>

          <div className="create-view__titles">
            <h1 className="create-view__title">EJEMPLOS DE NOTAS👌</h1>
            <p className="create-view__subtitle">
              Explora y gestiona las notas y eventos precargados en tu espacio de trabajo antes de iniciar la sincronización en vivo.
            </p>
          </div>

          {/* Métricas rápidas de sincronización */}
          <div className="create-view__stats" role="region" aria-label="Resumen de eventos">
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Total Precargados</span>
              <span className="create-view__stat-value">{totalEventos}</span>
            </div>
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Enviados a Calendar</span>
              <span className="create-view__stat-value create-view__stat-value--lime">
                {enviadosCount}
              </span>
            </div>
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Pendientes</span>
              <span className="create-view__stat-value create-view__stat-value--fog">
                {pendientesCount}
              </span>
            </div>
          </div>
        </header>

        {/* Grid de Tarjetas de Eventos con .map() y Destructuring */}
        <section className="create-view__grid" aria-label="Listado de eventos precargados">
          {eventList.map(
            ({
              id,
              titulo,
              descripcion,
              fecha,
              hora,
              ubicacion,
              categoria,
              enviadoACalendar,
              ...resto
            }) => {
              // Uso de Spread Operator para pasar atributos y roles base de la tarjeta
              const cardBase = {
                className: `event-card ${enviadoACalendar ? 'event-card--synced' : 'event-card--pending'}`,
                role: 'article'
              }

              // Atributos base para el badge de estado
              const badgeBase = {
                className: `event-card__badge ${enviadoACalendar ? 'event-card__badge--synced' : 'event-card__badge--pending'}`,
                'aria-live': 'polite'
              }

              return (
                <article
                  key={id}
                  {...cardBase}
                  data-id={id}
                  data-category={categoria}
                  {...resto}
                >
                  {/* Barra de categoría superior */}
                  <div className="event-card__top">
                    <span className="event-card__category" data-category={categoria}>
                      {categoria}
                    </span>
                    <span className="event-card__date">
                      {formatEventDate(fecha)}
                    </span>
                  </div>

                  {/* Título y descripción */}
                  <div className="event-card__body">
                    <h2 className="event-card__title">{titulo}</h2>
                    <p className="event-card__description">{descripcion}</p>
                  </div>

                  {/* Metadatos (Hora y Ubicación) */}
                  <div className="event-card__meta">
                    <div className="event-card__meta-item">
                      <ClockIcon size={14} />
                      <span>{hora}</span>
                    </div>
                    <div className="event-card__meta-item">
                      <MapPinIcon size={14} />
                      <span>{ubicacion}</span>
                    </div>
                  </div>

                  {/* Pie de tarjeta: Estado y Acción */}
                  <div className="event-card__footer">
                    <div {...badgeBase}>
                      {enviadoACalendar ? (
                        <>
                          <CheckIcon size={14} />
                          <span>✓ Enviado a Google Calendar</span>
                        </>
                      ) : (
                        <>
                          <span className="event-card__badge-pulse" aria-hidden="true" />
                          <span>Pendiente de envío</span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      className={`event-card__action-btn ${enviadoACalendar ? 'event-card__action-btn--disabled' : ''}`}
                      onClick={() => marcarEnviado(id)}
                      disabled={enviadoACalendar}
                      aria-label={
                        enviadoACalendar
                          ? `El evento ${titulo} ya está enviado`
                          : `Marcar ${titulo} como enviado a Google Calendar`
                      }
                    >
                      {enviadoACalendar ? (
                        <span>✓ Sincronizado</span>
                      ) : (
                        <>
                          <CalendarIcon size={14} />
                          <span>Marcar como enviado</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              )
            }
          )}
        </section>
      </div>
    </main>
  )
}

export default CreateView
