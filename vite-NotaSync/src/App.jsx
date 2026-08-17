import Welcome from './Welcome'

function App() {
  return (
    <Welcome onStart={() => console.log('Empezar a crear!')} />
  )
}

export default App
