import { useState, useMemo } from 'react'
import { mockEvents, formatEventDate } from '../data/mockEvents'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckIcon,
  ArrowLeftIcon,
  SearchIcon,
  RefreshIcon,
  TagIcon
} from './icons'
import './CreateView.css'

/**
 * Vista "Empezar a crear" — Renderizado de eventos precargados
 * Consulta y muestra completamente todos los datos del banco de eventos (mockEvents.js).
 */
const CreateView = ({
  events = mockEvents,
  onToggleEvent,
  onSyncAll,
  onResetEvents,
  onBack,
  onNavigatePendientes
}) => {
  // Estado de la lista de eventos
  const eventList = events && events.length > 0 ? events : mockEvents

  // Filtros interactivos
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [statusFilter, setStatusFilter] = useState('todos') // 'todos' | 'pendientes' | 'enviados'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventModal, setSelectedEventModal] = useState(null)

  /**
   * Marca un evento como enviado o desmarcado
   */
  const toggleEnviado = (id) => {
    if (onToggleEvent) {
      onToggleEvent(id)
    }
  }

  /**
   * Marca un evento específicamente como Tarea Pendiente
   */
  const setEventoPendiente = (id) => {
    const target = eventList.find((ev) => ev.id === id)
    if (target && target.enviadoACalendar && onToggleEvent) {
      onToggleEvent(id)
    }
  }

  /**
   * Marca un evento específicamente como Enviado a Google Calendar
   */
  const setEventoEnviado = (id) => {
    const target = eventList.find((ev) => ev.id === id)
    if (target && !target.enviadoACalendar && onToggleEvent) {
      onToggleEvent(id)
    }
  }

  /**
   * Marca todos los eventos como sincronizados
   */
  const marcarTodosEnviados = () => {
    if (onSyncAll) {
      onSyncAll()
    }
  }

  /**
   * Restablece el estado de todos los eventos
   */
  const reiniciarEstados = () => {
    if (onResetEvents) {
      onResetEvents()
    }
  }

  // Métricas calculadas
  const totalEventos = eventList.length
  const enviadosCount = eventList.filter((ev) => ev.enviadoACalendar).length
  const pendientesCount = totalEventos - enviadosCount

  // Conteo por categoría
  const categoryCounts = useMemo(() => {
    return {
      todas: eventList.length,
      trabajo: eventList.filter((ev) => ev.categoria?.toLowerCase() === 'trabajo').length,
      salud: eventList.filter((ev) => ev.categoria?.toLowerCase() === 'salud').length,
      personal: eventList.filter((ev) => ev.categoria?.toLowerCase() === 'personal').length,
      social: eventList.filter((ev) => ev.categoria?.toLowerCase() === 'social').length,
    }
  }, [eventList])

  // Filtrado reactivo de eventos con soporte de búsqueda por ID mediante .find()
  const filteredEvents = useMemo(() => {
    const rawQuery = searchQuery.trim()
    const query = rawQuery.toLowerCase()
    const idToSearch = query.startsWith('#') ? query.slice(1) : query

    // Si el usuario busca directamente por ID (ej. 'evt-037', '#evt-037' o formato 'evt-XXX'),
    // utilizamos el método .find() de JavaScript para localizar la tarjeta exacta en el banco de eventos:
    if (idToSearch.startsWith('evt-') || idToSearch === 'evt-037') {
      const foundCard = eventList.find((ev) => ev.id.toLowerCase() === idToSearch)
      if (foundCard) {
        const matchesCategory = selectedCategory === 'todas' || foundCard.categoria?.toLowerCase() === selectedCategory.toLowerCase()
        const matchesStatus = statusFilter === 'todos' || (statusFilter === 'pendientes' ? !foundCard.enviadoACalendar : foundCard.enviadoACalendar)
        return matchesCategory && matchesStatus ? [foundCard] : []
      }
    }

    // Comprobación adicional con .find() si la consulta coincide exactamente con algún ID del banco
    if (idToSearch !== '') {
      const exactMatchById = eventList.find((ev) => ev.id.toLowerCase() === idToSearch)
      if (exactMatchById) {
        const matchesCategory = selectedCategory === 'todas' || exactMatchById.categoria?.toLowerCase() === selectedCategory.toLowerCase()
        const matchesStatus = statusFilter === 'todos' || (statusFilter === 'pendientes' ? !exactMatchById.enviadoACalendar : exactMatchById.enviadoACalendar)
        if (matchesCategory && matchesStatus) {
          return [exactMatchById]
        }
      }
    }

    // Filtrado general por texto y categoría con .filter()
    return eventList.filter((ev) => {
      // Filtro por categoría
      if (selectedCategory !== 'todas' && ev.categoria?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }
      // Filtro por estado de envío
      if (statusFilter === 'pendientes' && ev.enviadoACalendar) {
        return false
      }
      if (statusFilter === 'enviados' && !ev.enviadoACalendar) {
        return false
      }
      // Filtro por búsqueda textual
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
  }, [eventList, selectedCategory, statusFilter, searchQuery])

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
            <div className="create-view__nav-actions">
              {onNavigatePendientes && (
                <button
                  type="button"
                  className="create-view__nav-pendientes-btn"
                  onClick={onNavigatePendientes}
                  title="Ir al panel exclusivo de tareas pendientes"
                >
                  <ClockIcon size={14} />
                  <span>Ver {pendientesCount} Tareas Pendientes</span>
                </button>
              )}
              <div className="create-view__badge-tag">
                <span className="create-view__dot" aria-hidden="true" />
                <span>Base de Datos Activa ({totalEventos} Eventos)</span>
              </div>
            </div>
          </div>

          <div className="create-view__titles">
            <h1 className="create-view__title">NOTAS Y EVENTOS PRECARGADOS 👌</h1>
            <p className="create-view__subtitle">
              Explora y gestiona todos los 37 eventos y notas precargados de NotaSync. Cada elemento incluye fecha, hora, ubicación, categoría, color de acento y estado de sincronización con Google Calendar.
            </p>
          </div>

          {/* Métricas rápidas de sincronización */}
          <div className="create-view__stats" role="region" aria-label="Resumen de eventos">
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Total en Banco</span>
              <span className="create-view__stat-value">{totalEventos}</span>
            </div>
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Enviados a Calendar</span>
              <span className="create-view__stat-value create-view__stat-value--lime">
                {enviadosCount}
              </span>
            </div>
            <div
              className="create-view__stat-card"
              onClick={onNavigatePendientes}
              style={{ cursor: onNavigatePendientes ? 'pointer' : 'default' }}
              title={onNavigatePendientes ? "Clic para abrir la vista exclusiva de pendientes" : undefined}
            >
              <span className="create-view__stat-label">
                Pendientes {onNavigatePendientes && '↗'}
              </span>
              <span className="create-view__stat-value create-view__stat-value--fog">
                {pendientesCount}
              </span>
            </div>
            <div className="create-view__stat-card">
              <span className="create-view__stat-label">Visibles Ahora</span>
              <span className="create-view__stat-value create-view__stat-value--paper">
                {filteredEvents.length}
              </span>
            </div>
          </div>
        </header>

        {/* Barra de Filtros, Búsqueda y Acciones Masivas */}
        <section className="create-view__controls" aria-label="Herramientas de filtrado y búsqueda">
          <div className="create-view__search-wrapper">
            <SearchIcon size={16} className="create-view__search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, descripción, ubicación o ID (#evt-001, #evt-037)..."
              className="create-view__search-input"
              aria-label="Buscar eventos"
            />
            {searchQuery && (
              <button
                type="button"
                className="create-view__search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Borrar búsqueda"
              >
                ×
              </button>
            )}
          </div>

          {/* Acceso rápido a búsqueda por ID con find() */}
          <div className="create-view__quick-tags" aria-label="Búsqueda rápida por ID con find">
            <span className="create-view__quick-label">Búsqueda rápida con .find():</span>
            <button
              type="button"
              className={`create-view__quick-tag ${searchQuery.toLowerCase().includes('evt-037') ? 'create-view__quick-tag--active' : ''}`}
              onClick={() => setSearchQuery('evt-037')}
              title="Buscar tarjeta con ID evt-037 (David Mauricio Vargas) mediante .find()"
            >
              #evt-037 (David Mauricio Vargas)
            </button>
            <button
              type="button"
              className={`create-view__quick-tag ${searchQuery.toLowerCase().includes('evt-001') ? 'create-view__quick-tag--active' : ''}`}
              onClick={() => setSearchQuery('evt-001')}
              title="Buscar tarjeta con ID evt-001 mediante .find()"
            >
              #evt-001
            </button>
          </div>

          <div className="create-view__filter-row">
            {/* Filtros por Categoría */}
            <div className="create-view__category-tabs" role="tablist" aria-label="Filtrar por categoría">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'todas'}
                className={`category-tab ${selectedCategory === 'todas' ? 'category-tab--active' : ''}`}
                onClick={() => setSelectedCategory('todas')}
              >
                Todas <span className="category-tab__count">({categoryCounts.todas})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'trabajo'}
                className={`category-tab category-tab--trabajo ${selectedCategory === 'trabajo' ? 'category-tab--active' : ''}`}
                onClick={() => setSelectedCategory('trabajo')}
              >
                Trabajo <span className="category-tab__count">({categoryCounts.trabajo})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'salud'}
                className={`category-tab category-tab--salud ${selectedCategory === 'salud' ? 'category-tab--active' : ''}`}
                onClick={() => setSelectedCategory('salud')}
              >
                Salud <span className="category-tab__count">({categoryCounts.salud})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'personal'}
                className={`category-tab category-tab--personal ${selectedCategory === 'personal' ? 'category-tab--active' : ''}`}
                onClick={() => setSelectedCategory('personal')}
              >
                Personal <span className="category-tab__count">({categoryCounts.personal})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'social'}
                className={`category-tab category-tab--social ${selectedCategory === 'social' ? 'category-tab--active' : ''}`}
                onClick={() => setSelectedCategory('social')}
              >
                Social <span className="category-tab__count">({categoryCounts.social})</span>
              </button>
            </div>

            {/* Acciones de estado y masivas */}
            <div className="create-view__actions-bar">
              <div className="create-view__status-select-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="create-view__status-select"
                  aria-label="Filtrar por estado de sincronización"
                >
                  <option value="todos">Estado: Todos</option>
                  <option value="pendientes">Estado: Pendientes</option>
                  <option value="enviados">Estado: Enviados</option>
                </select>
              </div>

              <button
                type="button"
                className="create-view__bulk-btn create-view__bulk-btn--sync"
                onClick={marcarTodosEnviados}
                title="Marcar todos los eventos visibles como enviados"
              >
                <CheckIcon size={14} />
                <span>Sincronizar todos</span>
              </button>

              <button
                type="button"
                className="create-view__bulk-btn create-view__bulk-btn--reset"
                onClick={reiniciarEstados}
                title="Reiniciar todos los estados a pendientes"
              >
                <RefreshIcon size={14} />
                <span>Restablecer</span>
              </button>
            </div>
          </div>
        </section>

        {/* Resumen de resultados */}
        <div className="create-view__results-info">
          <span>Mostrando <strong>{filteredEvents.length}</strong> de <strong>{totalEventos}</strong> eventos disponibles</span>
          {(selectedCategory !== 'todas' || statusFilter !== 'todos' || searchQuery) && (
            <button
              type="button"
              className="create-view__clear-all-btn"
              onClick={() => {
                setSelectedCategory('todas')
                setStatusFilter('todos')
                setSearchQuery('')
              }}
            >
              Limpiar todos los filtros
            </button>
          )}
        </div>

        {/* Grid de Tarjetas de Eventos con .map() y Destructuring completo de todas las propiedades */}
        {filteredEvents.length > 0 ? (
          <section className="create-view__grid" aria-label="Listado de eventos precargados">
            {filteredEvents.map(
              ({
                id,
                titulo,
                descripcion,
                fecha,
                hora,
                ubicacion,
                categoria,
                color,
                enviadoACalendar,
                ...resto
              }) => {
                // Configuración de estilo y clase de tarjeta
                const cardBase = {
                  className: `event-card ${enviadoACalendar ? 'event-card--synced' : 'event-card--pending'}`,
                  role: 'article',
                  style: { borderLeftColor: color || undefined }
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
                    {/* Barra de categoría e ID superior */}
                    <div className="event-card__top">
                      <div className="event-card__top-left">
                        <span className="event-card__id">#{id}</span>
                        <span className="event-card__category" data-category={categoria}>
                          <TagIcon size={11} />
                          <span>{categoria}</span>
                        </span>
                      </div>
                      <span className="event-card__date" title={`ISO: ${fecha}`}>
                        {formatEventDate(fecha)}
                      </span>
                    </div>

                    {/* Título y descripción */}
                    <div className="event-card__body">
                      <h2 className="event-card__title">{titulo}</h2>
                      <p className="event-card__description">{descripcion}</p>
                    </div>

                    {/* Metadatos (Hora, Ubicación y Color de Acento) */}
                    <div className="event-card__meta">
                      <div className="event-card__meta-item" title="Horario programado">
                        <ClockIcon size={14} />
                        <span>{hora}</span>
                      </div>
                      <div className="event-card__meta-item" title="Lugar o enlace">
                        <MapPinIcon size={14} />
                        <span>{ubicacion}</span>
                      </div>
                      <div className="event-card__meta-item event-card__meta-item--color" title={`Color asignado: ${color}`}>
                        <span
                          className="event-card__color-dot"
                          style={{ backgroundColor: color }}
                          aria-hidden="true"
                        />
                        <span className="event-card__color-name">{color}</span>
                        <span className="event-card__iso-tag">ISO: {fecha ? fecha.split('T')[0] : 'N/A'}</span>
                      </div>
                    </div>

                    {/* Pie de tarjeta: Estado, Botón de Inspección y Botones de Acción */}
                    <div className="event-card__footer">
                      <div className="event-card__footer-top">
                        <div {...badgeBase}>
                          {enviadoACalendar ? (
                            <>
                              <CheckIcon size={14} />
                              <span>✓ Enviado a Google Calendar</span>
                            </>
                          ) : (
                            <>
                              <span className="event-card__badge-pulse" aria-hidden="true" />
                              <span>Tarea Pendiente</span>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          className="event-card__raw-btn"
                          onClick={() => setSelectedEventModal({ id, titulo, descripcion, fecha, hora, ubicacion, categoria, color, enviadoACalendar })}
                          title="Ver objeto JSON completo"
                          aria-label={`Ver JSON del evento ${id}`}
                        >
                          JSON
                        </button>
                      </div>

                      {/* Botón Tarea pendiente y Botón Enviar a Calendar */}
                      <div className="event-card__actions-row">
                        <button
                          type="button"
                          className={`event-card__action-btn event-card__action-btn--pending ${!enviadoACalendar ? 'event-card__action-btn--active-pending' : ''}`}
                          onClick={() => setEventoPendiente(id)}
                          title={!enviadoACalendar ? 'Esta nota está activa como tarea pendiente' : 'Marcar como tarea pendiente'}
                          aria-label={`Marcar ${titulo} como tarea pendiente`}
                        >
                          <ClockIcon size={14} />
                          <span>{!enviadoACalendar ? '● Tarea pendiente' : 'Tarea pendiente'}</span>
                        </button>

                        <button
                          type="button"
                          className={`event-card__action-btn event-card__action-btn--sync ${enviadoACalendar ? 'event-card__action-btn--active-sync' : ''}`}
                          onClick={() => setEventoEnviado(id)}
                          title={enviadoACalendar ? 'Ya sincronizado en Google Calendar' : 'Enviar nota a Google Calendar'}
                          aria-label={
                            enviadoACalendar
                              ? `El evento ${titulo} ya está en Google Calendar`
                              : `Enviar ${titulo} a Google Calendar`
                          }
                        >
                          {enviadoACalendar ? <CheckIcon size={14} /> : <CalendarIcon size={14} />}
                          <span>{enviadoACalendar ? '✓ En Calendar' : 'Enviar a Calendar'}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                )
              }
            )}
          </section>
        ) : (
          <div className="create-view__empty-state">
            <div className="create-view__empty-icon">🔍</div>
            <h3 className="create-view__empty-title">No se encontraron eventos</h3>
            <p className="create-view__empty-desc">
              Ningún evento coincide con el criterio de búsqueda "{searchQuery}" o los filtros seleccionados.
            </p>
            <button
              type="button"
              className="create-view__empty-btn"
              onClick={() => {
                setSelectedCategory('todas')
                setStatusFilter('todos')
                setSearchQuery('')
              }}
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

        {/* Modal de Detalle JSON Completo */}
        {selectedEventModal && (
          <div
            className="create-view__modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={() => setSelectedEventModal(null)}
          >
            <div
              className="create-view__modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="create-view__modal-header">
                <div>
                  <span className="create-view__modal-badge">Objeto de Datos Completo</span>
                  <h3 id="modal-title" className="create-view__modal-title">
                    #{selectedEventModal.id} — {selectedEventModal.titulo}
                  </h3>
                </div>
                <button
                  type="button"
                  className="create-view__modal-close"
                  onClick={() => setSelectedEventModal(null)}
                  aria-label="Cerrar modal"
                >
                  ×
                </button>
              </div>

              <div className="create-view__modal-body">
                <div className="create-view__modal-grid">
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">ID:</span>
                    <span className="create-view__modal-val">{selectedEventModal.id}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Categoría:</span>
                    <span className="create-view__modal-val">{selectedEventModal.categoria}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Fecha ISO:</span>
                    <span className="create-view__modal-val">{selectedEventModal.fecha}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Fecha Formateada:</span>
                    <span className="create-view__modal-val">{formatEventDate(selectedEventModal.fecha)}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Hora:</span>
                    <span className="create-view__modal-val">{selectedEventModal.hora}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Ubicación:</span>
                    <span className="create-view__modal-val">{selectedEventModal.ubicacion}</span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Color:</span>
                    <span className="create-view__modal-val">
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          backgroundColor: selectedEventModal.color,
                          borderRadius: '50%',
                          marginRight: '6px'
                        }}
                      />
                      {selectedEventModal.color}
                    </span>
                  </div>
                  <div className="create-view__modal-item">
                    <span className="create-view__modal-key">Enviado a Calendar:</span>
                    <span className="create-view__modal-val">
                      {selectedEventModal.enviadoACalendar ? 'true (Sincronizado)' : 'false (Pendiente)'}
                    </span>
                  </div>
                </div>

                <div className="create-view__modal-json-wrap">
                  <span className="create-view__modal-json-label">Representación JSON cruda:</span>
                  <pre className="create-view__modal-json">
                    {JSON.stringify(selectedEventModal, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="create-view__modal-footer">
                <button
                  type="button"
                  className="create-view__modal-action-btn"
                  onClick={() => {
                    toggleEnviado(selectedEventModal.id)
                    setSelectedEventModal((prev) => ({
                      ...prev,
                      enviadoACalendar: !prev.enviadoACalendar
                    }))
                  }}
                >
                  {selectedEventModal.enviadoACalendar
                    ? 'Desmarcar de Calendar'
                    : 'Marcar como Enviado'}
                </button>
                <button
                  type="button"
                  className="create-view__modal-close-btn"
                  onClick={() => setSelectedEventModal(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CreateView

