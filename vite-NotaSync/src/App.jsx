import { useState } from 'react'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import CreateView from './components/CreateView'
import GoogleCalendar from './components/GoogleCalendar'
import Footer from './components/Footer'
import { mockEvents } from './data/mockEvents'

/**
 * Componente principal de la aplicación
 * Gestiona el estado mínimo de navegación y renderizado condicional.
 */
const App = () => {
  // Estado mínimo de navegación: "home" | "crear" | "calendar"
  const [vista, setVista] = useState('home')

  // Manejador arrow function para navegar a la vista de creación
  const handleStartCrear = () => {
    setVista('crear')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Manejador arrow function para la vista de integración de calendario
  const handleConnectGoogle = () => {
    setVista('calendar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Manejador arrow function para volver al inicio
  const handleNavigateHome = () => {
    setVista('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Simulación de sincronización
  const handleStartSync = () => {
    alert(
      'Conexión exitosa: Tu cuenta de Google Calendar está vinculada a NotaSync. ¡Las notas con fechas se agendarán en tiempo real!'
    )
  }

  return (
    <div className="app-container">
      {/* Navbar siempre visible */}
      <Navbar
        onConnectGoogle={handleConnectGoogle}
        onNavigateHome={handleNavigateHome}
      />

      {/* Renderizado condicional según el estado de la vista */}
      {vista === 'crear' ? (
        <CreateView events={mockEvents} onBack={handleNavigateHome} />
      ) : vista === 'calendar' ? (
        <GoogleCalendar
          onBack={handleNavigateHome}
          onStartSync={handleStartSync}
        />
      ) : (
        <Welcome onStart={handleStartCrear} />
      )}

      {/* Footer siempre visible */}
      <Footer />
    </div>
  )
}

export default App
