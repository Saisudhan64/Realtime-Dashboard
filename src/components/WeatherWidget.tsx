import { useWeatherData } from '../hooks/useWeatherData'

export function WeatherWidget({ city }: { city: string }) {
  const { data, isLoading, error } = useWeatherData(city)

  if (isLoading) return <WidgetSkeleton />
  if (error) return <WidgetError message="Failed to load weather" />

  const { bgGradient, emoji } = getWeatherVisuals(data?.temp ?? 20, data?.description ?? '')

  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${bgGradient}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">{data?.city}</h3>
        <span className="text-2xl">{emoji}</span>
      </div>
      <p className="text-4xl font-bold text-slate-800">{data?.temp}°C</p>
      <p className="text-sm text-slate-600 capitalize mt-1">{data?.description}</p>
      <div className="mt-4 pt-4 border-t border-white/50 flex justify-between text-sm text-slate-600">
        <span>Feels like</span>
        <span className="font-medium text-slate-800">{data?.feelsLike}°C</span>
      </div>
    </div>
  )
}

function getWeatherVisuals(temp: number, description: string) {
  const desc = description.toLowerCase()

  if (desc.includes('rain') || desc.includes('drizzle')) {
    return { bgGradient: 'bg-gradient-to-br from-slate-200 to-blue-200', emoji: '🌧️' }
  }
  if (desc.includes('cloud') || desc.includes('overcast')) {
    return { bgGradient: 'bg-gradient-to-br from-gray-100 to-slate-200', emoji: '☁️' }
  }
  if (desc.includes('thunder')) {
    return { bgGradient: 'bg-gradient-to-br from-slate-300 to-indigo-200', emoji: '⛈️' }
  }

  // Temperature-based fallback for clear skies
  if (temp >= 35) return { bgGradient: 'bg-gradient-to-br from-orange-100 to-red-200', emoji: '🔥' }
  if (temp >= 28) return { bgGradient: 'bg-gradient-to-br from-yellow-100 to-orange-200', emoji: '☀️' }
  if (temp >= 20) return { bgGradient: 'bg-gradient-to-br from-blue-100 to-cyan-200', emoji: '🌤️' }
  return { bgGradient: 'bg-gradient-to-br from-blue-200 to-indigo-200', emoji: '❄️' }
}

function WidgetSkeleton() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-slate-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
    </div>
  )
}

function WidgetError({ message }: { message: string }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-red-100">
      <p className="text-red-500 text-sm font-medium">{message}</p>
    </div>
  )
}