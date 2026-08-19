import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import CreateView from './components/CreateView'
import ViewPendientes from './components/ViewPendientes'
import GoogleCalendar from './components/GoogleCalendar'
import Footer from './components/Footer'
import { mockEvents } from './data/mockEvents'

/**
 * Componente principal de la aplicación NotaSync
 * Gestiona el estado de navegación ("home" | "crear" | "pendientes" | "calendar")
 * y el estado global reactivo del banco de eventos/tareas.
 */
const App = () => {
  // Estado de navegación
  const [vista, setVista] = useState('home')

  // Estado compartido de eventos precargados
  const [events, setEvents] = useState(mockEvents)

  // Cantidad de tareas pendientes calculadas en tiempo real
  const pendingCount = useMemo(() => {
    return events.filter((ev) => !ev.enviadoACalendar).length
  }, [events])

  // Navegación: Vista de creación/todos los eventos
  const handleStartCrear = () => {
    setVista('crear')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Navegación: Vista exclusiva de tareas pendientes
  const handleNavigatePendientes = () => {
    setVista('pendientes')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Navegación: Vista de integración con Google Calendar
  const handleConnectGoogle = () => {
    setVista('calendar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Navegación: Volver al inicio
  const handleNavigateHome = () => {
    setVista('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Marcar/desmarcar evento individual como enviado a Google Calendar
  const handleToggleEvent = (id) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, enviadoACalendar: !ev.enviadoACalendar } : ev
      )
    )
  }

  // Marcar todos los eventos como sincronizados
  const handleSyncAll = () => {
    setEvents((prev) => prev.map((ev) => ({ ...ev, enviadoACalendar: true })))
  }

  // Restablecer todos los eventos a pendientes
  const handleResetEvents = () => {
    setEvents(mockEvents.map((ev) => ({ ...ev, enviadoACalendar: false })))
  }

  // Simulación de sincronización directa desde la vista Calendar
  const handleStartSync = () => {
    alert(
      'Conexión exitosa: Tu cuenta de Google Calendar está vinculada a NotaSync. ¡Las notas con fechas se agendarán en tiempo real!'
    )
  }

  return (
    <div className="app-container">
      {/* Navbar global con contador badge dinámico */}
      <Navbar
        onConnectGoogle={handleConnectGoogle}
        onNavigateHome={handleNavigateHome}
        onNavigateCrear={handleStartCrear}
        onNavigatePendientes={handleNavigatePendientes}
        pendingCount={pendingCount}
      />

      {/* Renderizado condicional de vistas */}
      {vista === 'crear' ? (
        <CreateView
          events={events}
          onToggleEvent={handleToggleEvent}
          onSyncAll={handleSyncAll}
          onResetEvents={handleResetEvents}
          onBack={handleNavigateHome}
          onNavigatePendientes={handleNavigatePendientes}
        />
      ) : vista === 'pendientes' ? (
        <ViewPendientes
          events={events}
          onToggleEvent={handleToggleEvent}
          onSyncAll={handleSyncAll}
          onBack={handleNavigateHome}
          onNavigateCreate={handleStartCrear}
          onConnectGoogle={handleConnectGoogle}
        />
      ) : vista === 'calendar' ? (
        <GoogleCalendar
          onBack={handleNavigateHome}
          onStartSync={handleStartSync}
        />
      ) : (
        <Welcome
          onStart={handleStartCrear}
          onGoPendientes={handleNavigatePendientes}
          pendingCount={pendingCount}
        />
      )}

      {/* Footer siempre visible */}
      <Footer />
    </div>
  )
}

export default App
