import { WeatherWidget } from './components/WeatherWidget'
import { AirQualityWidget } from './components/AirQualityWidget'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Realtime Dashboard</h1>
        <p className="text-slate-500 mt-1">Live environmental data, updated every minute</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherWidget city="Chennai" />
        <AirQualityWidget city="Chennai" />
      </div>
    </div>
  )
}

export default App