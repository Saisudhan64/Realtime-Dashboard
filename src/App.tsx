import { WeatherWidget } from './components/WeatherWidget'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
      <WeatherWidget city="Bangalore" />
    </div>
  )
}

export default App