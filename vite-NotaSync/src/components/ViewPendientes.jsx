import { useState, useMemo } from 'react'
import { formatEventDate } from '../data/mockEvents'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
  SearchIcon,
  TagIcon,
  AlertTriangleIcon,
  BellIcon,
  FlameIcon,
  SparklesIcon,
  CheckCircleIcon,
  ListTodoIcon,
  InfoIcon
} from './icons'
import '../styles/ViewPendientes.css'

/**
 * Componente ViewPendientes — Vista dedicada exclusivamente a Tareas y Notas Pendientes
 * Cuenta con un sistema de alertas visuales llamativas que advierten de las tareas por realizar.
 */
const ViewPendientes = ({
  events = [],
  onToggleEvent,
  onSyncAll,
  onBack,
  onNavigateCreate,
  onConnectGoogle
}) => {
  // Filtros y controles
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('fecha-asc') // 'fecha-asc' | 'fecha-desc' | 'categoria'
  const [selectedEventModal, setSelectedEventModal] = useState(null)

  // 1. Filtrar solo las tareas pendientes (!enviadoACalendar)
  const pendingEvents = useMemo(() => {
    return events.filter((ev) => !ev.enviadoACalendar)
  }, [events])

  // Métricas generales
  const totalOriginal = events.length
  const totalPendientes = pendingEvents.length
  const totalCompletados = totalOriginal - totalPendientes
  const progressPercent = totalOriginal > 0 ? Math.round((totalCompletados / totalOriginal) * 100) : 100

  // Conteo por categoría dentro de los pendientes
  const categoryCounts = useMemo(() => {
    return {
      todas: pendingEvents.length,
      trabajo: pendingEvents.filter((ev) => ev.categoria?.toLowerCase() === 'trabajo').length,
      salud: pendingEvents.filter((ev) => ev.categoria?.toLowerCase() === 'salud').length,
      personal: pendingEvents.filter((ev) => ev.categoria?.toLowerCase() === 'personal').length,
      social: pendingEvents.filter((ev) => ev.categoria?.toLowerCase() === 'social').length
    }
  }, [pendingEvents])

  // Filtrado reactivo y ordenamiento de tareas pendientes con soporte de .find() por ID
  const filteredAndSortedEvents = useMemo(() => {
    const rawQuery = searchQuery.trim()
    const query = rawQuery.toLowerCase()
    const idToSearch = query.startsWith('#') ? query.slice(1) : query

    // Si el usuario busca directamente por ID mediante .find()
    if (idToSearch.startsWith('evt-') || idToSearch === 'evt-037') {
      const foundCard = pendingEvents.find((ev) => ev.id.toLowerCase() === idToSearch)
      if (foundCard) {
        const matchCategory = selectedCategory === 'todas' || foundCard.categoria?.toLowerCase() === selectedCategory.toLowerCase()
        return matchCategory ? [foundCard] : []
      }
    }

    const list = pendingEvents.filter((ev) => {
      // Filtro por categoría
      if (selectedCategory !== 'todas' && ev.categoria?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }
      // Filtro por búsqueda de texto
      if (query !== '') {
        const matchTitle = ev.titulo?.toLowerCase().includes(query)
        const matchDesc = ev.descripcion?.toLowerCase().includes(query)
        const matchLocation = ev.ubicacion?.toLowerCase().includes(query)
        const matchId = ev.id?.toLowerCase().includes(query)
        const matchCategory = ev.categoria?.toLowerCase().includes(query)
        return matchTitle || matchDesc || matchLocation || matchId || matchCategory
      }
      return true
    })

    // Ordenamiento
    return list.sort((a, b) => {
      if (sortBy === 'fecha-asc') {
        return new Date(a.fecha) - new Date(b.fecha)
      }
      if (sortBy === 'fecha-desc') {
        return new Date(b.fecha) - new Date(a.fecha)
      }
      if (sortBy === 'categoria') {
        return (a.categoria || '').localeCompare(b.categoria || '')
      }
      return 0
    })
  }, [pendingEvents, selectedCategory, searchQuery, sortBy])

  // Manejador para marcar una tarea individual
  const handleToggle = (id) => {
    if (onToggleEvent) {
      onToggleEvent(id)
    }
  }

  // Manejador para sincronizar todas
  const handleSyncAll = () => {
    if (onSyncAll) {
      onSyncAll()
    }
  }

  return (
    <main className="pendientes-view" id="tareas-pendientes-view">
      <div className="pendientes-view__bg-glow" aria-hidden="true" />

      <div className="pendientes-view__container">
        {/* Encabezado Principal */}
        <header className="pendientes-view__header">
          <div className="pendientes-view__nav-bar">
            {onBack && (
              <button
                type="button"
                className="pendientes-view__back-btn"
                onClick={onBack}
                aria-label="Volver al inicio"
              >
                <ArrowLeftIcon size={16} />
                <span>Volver al inicio</span>
              </button>
            )}

            <div className="pendientes-view__badge-tag">
              <span className="pendientes-view__dot" aria-hidden="true" />
              <span>{totalPendientes} Tareas Pendientes por Realizar</span>
            </div>
          </div>

          <div className="pendientes-view__titles">
            <h1 className="pendientes-view__title">
              <span>PANEL DE TAREAS</span>
              <span className="pendientes-view__title-highlight">PENDIENTES ⏳</span>
            </h1>
            <p className="pendientes-view__subtitle">
              Vista centralizada de actividades, notas y compromisos pendientes. Revisa las alertas de atención prioritaria y sincronízalas directamente con tu Google Calendar.
            </p>
          </div>
        </header>

        {/* ==========================================================
            SISTEMA DE ALERTAS LLAMATIVAS (ALERTS)
            ========================================================== */}
        <section className="pendientes-alerts" aria-label="Alertas y notificaciones de tareas pendientes">
          {totalPendientes > 0 ? (
            <>
              {/* HERO ALERT: Banner de impacto principal */}
              <div className="hero-alert" role="alert" aria-live="assertive">
                <div className="hero-alert__top">
                  <div className="hero-alert__icon-title">
                    <div className="hero-alert__icon-wrap">
                      <AlertTriangleIcon size={28} />
                    </div>
                    <div>
                      <h2 className="hero-alert__heading">
                        ¡Atención! Tienes {totalPendientes} {totalPendientes === 1 ? 'tarea pendiente' : 'tareas pendientes'} por realizar
                      </h2>
                      <p className="hero-alert__subheading">
                        No permitas que se acumulen tus compromisos. Revisa las notas pendientes y sincronízalas en tiempo real con Google Calendar.
                      </p>
                    </div>
                  </div>

                  <div className="hero-alert__badge">
                    <FlameIcon size={16} />
                    <span>Acción Requerida</span>
                  </div>
                </div>

                {/* Barra de Progreso de Tareas */}
                <div className="hero-alert__progress-section">
                  <div className="hero-alert__progress-header">
                    <span>Progreso de Cumplimiento</span>
                    <span>{progressPercent}% Completado ({totalCompletados} de {totalOriginal} gestionadas)</span>
                  </div>
                  <div className="hero-alert__progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
                    <div
                      className="hero-alert__progress-fill"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Pie del Banner con llamada a la acción */}
                <div className="hero-alert__footer">
                  <div className="hero-alert__tips">
                    <InfoIcon size={16} />
                    <span>Tip: Al marcar una tarea como enviada, se programará automáticamente en tu agenda.</span>
                  </div>

                  {onSyncAll && (
                    <button
                      type="button"
                      className="hero-alert__cta-btn"
                      onClick={handleSyncAll}
                    >
                      <CalendarIcon size={18} />
                      <span>Sincronizar Todas las Pendientes</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Grid de 3 Alertas Informativas y de Urgencia */}
              <div className="alert-cards-grid">
                <article className="alert-card alert-card--urgent">
                  <div className="alert-card__icon">
                    <BellIcon size={20} />
                  </div>
                  <div className="alert-card__content">
                    <h3 className="alert-card__title">Alerta de Agenda Activa</h3>
                    <p className="alert-card__text">
                      Las tareas pendientes <strong>no emitirán recordatorios móviles</strong> hasta que sean enviadas formalmente a tu Google Calendar.
                    </p>
                  </div>
                </article>

                <article className="alert-card alert-card--reminder">
                  <div className="alert-card__icon">
                    <ClockIcon size={20} />
                  </div>
                  <div className="alert-card__content">
                    <h3 className="alert-card__title">Próximos Compromisos</h3>
                    <p className="alert-card__text">
                      Tienes eventos programados para los próximos días. Prioriza las categorías de <strong>Trabajo</strong> y <strong>Salud</strong>.
                    </p>
                  </div>
                </article>

                <article className="alert-card alert-card--tip">
                  <div className="alert-card__icon">
                    <SparklesIcon size={20} />
                  </div>
                  <div className="alert-card__content">
                    <h3 className="alert-card__title">Sincronización Inteligente</h3>
                    <p className="alert-card__text">
                      Haz clic en <strong>"Marcar como enviada"</strong> en cada tarjeta para agendar el bloque horario exacto en tu calendario.
                    </p>
                  </div>
                </article>
              </div>
            </>
          ) : (
            /* Alerta de celebración cuando todas las tareas están completadas */
            <div className="all-completed-alert" role="status">
              <div className="all-completed-alert__icon">
                <CheckCircleIcon size={40} />
              </div>
              <h2 className="all-completed-alert__title">¡Estás al día! Todo está sincronizado 🎉</h2>
              <p className="all-completed-alert__desc">
                No tienes ninguna tarea o nota pendiente por realizar. Todos tus eventos están organizados y sincronizados con Google Calendar.
              </p>
              <div className="all-completed-alert__actions">
                {onNavigateCreate && (
                  <button
                    type="button"
                    className="all-completed-alert__btn"
                    onClick={onNavigateCreate}
                  >
                    <ListTodoIcon size={16} />
                    <span>Ver Todas las Notas y Eventos</span>
                  </button>
                )}
                {onConnectGoogle && (
                  <button
                    type="button"
                    className="all-completed-alert__btn all-completed-alert__btn--secondary"
                    onClick={onConnectGoogle}
                  >
                    <CalendarIcon size={16} />
                    <span>Integración Google Calendar</span>
                  </button>
                )}
                {onBack && (
                  <button
                    type="button"
                    className="all-completed-alert__btn all-completed-alert__btn--secondary"
                    onClick={onBack}
                  >
                    <span>Ir a la Página Principal</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ==========================================================
            CONTROLES: Búsqueda, Categorías y Ordenamiento
            ========================================================== */}
        {totalPendientes > 0 && (
          <>
            <section className="pendientes-controls" aria-label="Filtros para tareas pendientes">
              {/* Barra de búsqueda */}
              <div className="pendientes-search">
                <SearchIcon size={16} className="pendientes-search__icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar tareas pendientes por título, lugar, descripción o ID..."
                  className="pendientes-search__input"
                  aria-label="Buscar tareas pendientes"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="pendientes-search__clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpiar búsqueda"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Fila de Filtros y Acciones */}
              <div className="pendientes-filter-row">
                <div className="pendientes-category-tabs" role="tablist" aria-label="Categorías de pendientes">
                  <button
                    type="button"
                    className={`pendientes-category-btn ${selectedCategory === 'todas' ? 'pendientes-category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory('todas')}
                  >
                    <span>Todas</span>
                    <span className="pendientes-category-count">({categoryCounts.todas})</span>
                  </button>
                  <button
                    type="button"
                    className={`pendientes-category-btn ${selectedCategory === 'trabajo' ? 'pendientes-category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory('trabajo')}
                  >
                    <span>Trabajo</span>
                    <span className="pendientes-category-count">({categoryCounts.trabajo})</span>
                  </button>
                  <button
                    type="button"
                    className={`pendientes-category-btn ${selectedCategory === 'salud' ? 'pendientes-category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory('salud')}
                  >
                    <span>Salud</span>
                    <span className="pendientes-category-count">({categoryCounts.salud})</span>
                  </button>
                  <button
                    type="button"
                    className={`pendientes-category-btn ${selectedCategory === 'personal' ? 'pendientes-category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory('personal')}
                  >
                    <span>Personal</span>
                    <span className="pendientes-category-count">({categoryCounts.personal})</span>
                  </button>
                  <button
                    type="button"
                    className={`pendientes-category-btn ${selectedCategory === 'social' ? 'pendientes-category-btn--active' : ''}`}
                    onClick={() => setSelectedCategory('social')}
                  >
                    <span>Social</span>
                    <span className="pendientes-category-count">({categoryCounts.social})</span>
                  </button>
                </div>

                <div className="pendientes-actions">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pendientes-sort-select"
                    aria-label="Ordenar tareas pendientes"
                  >
                    <option value="fecha-asc">Ordenar: Próximas primero</option>
                    <option value="fecha-desc">Ordenar: Más lejanas primero</option>
                    <option value="categoria">Ordenar: Por Categoría</option>
                  </select>

                  {onSyncAll && (
                    <button
                      type="button"
                      className="pendientes-sync-all-btn"
                      onClick={handleSyncAll}
                    >
                      <CalendarIcon size={14} />
                      <span>Sincronizar Todas</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Barra de información de resultados */}
            <div className="pendientes-results-bar">
              <span>
                Mostrando <strong>{filteredAndSortedEvents.length}</strong> de <strong>{totalPendientes}</strong> tareas pendientes
              </span>
              {(selectedCategory !== 'todas' || searchQuery) && (
                <button
                  type="button"
                  className="pendientes-clear-btn"
                  onClick={() => {
                    setSelectedCategory('todas')
                    setSearchQuery('')
                  }}
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* ==========================================================
                GRID DE TARJETAS DE TAREAS PENDIENTES
                ========================================================== */}
            {filteredAndSortedEvents.length > 0 ? (
              <section className="pendientes-grid" aria-label="Listado de tareas pendientes">
                {filteredAndSortedEvents.map((task) => {
                  const {
                    id,
                    titulo,
                    descripcion,
                    fecha,
                    hora,
                    ubicacion,
                    categoria,
                    color
                  } = task

                  return (
                    <article
                      key={id}
                      className="pending-card"
                      data-id={id}
                      data-category={categoria}
                      style={{ borderLeftColor: color || '#ff0000' }}
                    >
                      {/* Cabecera de la tarjeta */}
                      <div className="pending-card__top">
                        <div className="pending-card__id-cat">
                          <span className="pending-card__id">#{id}</span>
                          <span className="pending-card__cat">
                            <TagIcon size={11} />
                            <span>{categoria}</span>
                          </span>
                        </div>
                        <span className="pending-card__date-pill">
                          <ClockIcon size={12} />
                          <span>{formatEventDate(fecha)}</span>
                        </span>
                      </div>

                      {/* Cuerpo: Título y descripción */}
                      <div className="pending-card__body">
                        <h2 className="pending-card__title">{titulo}</h2>
                        <p className="pending-card__desc">{descripcion}</p>
                      </div>

                      {/* Metadatos: Horario y Lugar */}
                      <div className="pending-card__meta">
                        <div className="pending-card__meta-item" title="Horario programado">
                          <ClockIcon size={14} />
                          <span>{hora}</span>
                        </div>
                        <div className="pending-card__meta-item" title="Ubicación o enlace">
                          <MapPinIcon size={14} />
                          <span>{ubicacion}</span>
                        </div>
                      </div>

                      {/* Footer con Alerta de Estado y Botón de Sincronización */}
                      <div className="pending-card__footer">
                        <div className="pending-card__status-row">
                          <div className="pending-card__status-alert">
                            <span className="pending-card__status-pulse" aria-hidden="true" />
                            <span>Falta por realizar / enviar</span>
                          </div>

                          <button
                            type="button"
                            className="pending-card__json-btn"
                            onClick={() => setSelectedEventModal(task)}
                            title="Ver detalles JSON"
                          >
                            JSON
                          </button>
                        </div>

                        <button
                          type="button"
                          className="pending-card__action-btn"
                          onClick={() => handleToggle(id)}
                          aria-label={`Marcar ${titulo} como completada o enviada a Google Calendar`}
                        >
                          <CalendarIcon size={16} />
                          <span>Enviada a Calendar</span>
                        </button>
                      </div>
                    </article>
                  )
                })}
              </section>
            ) : (
              /* Sin resultados por búsqueda */
              <div className="all-completed-alert">
                <div className="all-completed-alert__icon">
                  <SearchIcon size={32} />
                </div>
                <h3 className="all-completed-alert__title">No hay coincidencias</h3>
                <p className="all-completed-alert__desc">
                  No se encontraron tareas pendientes que coincidan con "{searchQuery}" en la categoría seleccionada.
                </p>
                <button
                  type="button"
                  className="all-completed-alert__btn"
                  onClick={() => {
                    setSelectedCategory('todas')
                    setSearchQuery('')
                  }}
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal de Detalle JSON */}
        {selectedEventModal && (
          <div
            className="pendientes-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-task-title"
            onClick={() => setSelectedEventModal(null)}
          >
            <div
              className="pendientes-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pendientes-modal-header">
                <div>
                  <span className="pendientes-modal-badge">Tarea Pendiente #{selectedEventModal.id}</span>
                  <h3 id="modal-task-title" className="pendientes-modal-title">
                    {selectedEventModal.titulo}
                  </h3>
                </div>
                <button
                  type="button"
                  className="pendientes-modal-close"
                  onClick={() => setSelectedEventModal(null)}
                  aria-label="Cerrar modal"
                >
                  ×
                </button>
              </div>

              <div className="pendientes-modal-body">
                <div className="pendientes-modal-grid">
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">ID:</span>
                    <span className="pendientes-modal-val">{selectedEventModal.id}</span>
                  </div>
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">Categoría:</span>
                    <span className="pendientes-modal-val">{selectedEventModal.categoria}</span>
                  </div>
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">Fecha Programada:</span>
                    <span className="pendientes-modal-val">{formatEventDate(selectedEventModal.fecha)}</span>
                  </div>
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">Horario:</span>
                    <span className="pendientes-modal-val">{selectedEventModal.hora}</span>
                  </div>
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">Ubicación:</span>
                    <span className="pendientes-modal-val">{selectedEventModal.ubicacion}</span>
                  </div>
                  <div className="pendientes-modal-item">
                    <span className="pendientes-modal-key">Estado Actual:</span>
                    <span className="pendientes-modal-val" style={{ color: '#ffb703' }}>
                      ⚠️ Pendiente de Envío
                    </span>
                  </div>
                </div>

                <div className="pendientes-modal-json-wrap">
                  <span className="pendientes-modal-json-label">Datos en bruto (JSON):</span>
                  <pre className="pendientes-modal-json">
                    {JSON.stringify(selectedEventModal, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="pendientes-modal-footer">
                <button
                  type="button"
                  className="pendientes-modal-dismiss-btn"
                  onClick={() => setSelectedEventModal(null)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="pendientes-modal-sync-btn"
                  onClick={() => {
                    handleToggle(selectedEventModal.id)
                    setSelectedEventModal(null)
                  }}
                >
                  Marcar como Enviada
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default ViewPendientes
