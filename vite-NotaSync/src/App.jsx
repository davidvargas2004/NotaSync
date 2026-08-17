import { useState } from 'react'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import GoogleCalendar from './components/GoogleCalendar'
import Footer from './components/Footer'

function App() {
  const [currentView, setCurrentView] = useState('home')

  const handleConnectGoogle = () => {
    setCurrentView('calendar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateHome = () => {
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartSync = () => {
    alert('Conexión exitosa: Tu cuenta de Google Calendar está vinculada a NotaSync. ¡Las notas con fechas se agendarán en tiempo real!')
  }

  return (
    <div className="app-container">
      <Navbar
        onConnectGoogle={handleConnectGoogle}
        onNavigateHome={handleNavigateHome}
      />

      {currentView === 'home' ? (
        <Welcome onStart={handleConnectGoogle} />
      ) : (
        <GoogleCalendar
          onBack={handleNavigateHome}
          onStartSync={handleStartSync}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
