import { useAirQualityData } from '../hooks/useAirQualityData'

export function AirQualityWidget({ city }: { city: string }) {
  const { data, isLoading, error } = useAirQualityData(city)

  if (isLoading) return <WidgetSkeleton />
  if (error) return <WidgetError message="Failed to load air quality" />

  const { bgGradient, badgeColor, emoji } = getAqiVisuals(data?.aqi ?? 0)

  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all ${bgGradient}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">{data?.location}</h3>
        <span className="text-2xl">{emoji}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-bold text-slate-800">{data?.aqi}</p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>AQI</span>
      </div>
      <div className="mt-4 pt-4 border-t border-white/50 space-y-1 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>PM2.5</span>
          <span className="font-medium text-slate-800">{data?.pm25} µg/m³</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>PM10</span>
          <span className="font-medium text-slate-800">{data?.pm10} µg/m³</span>
        </div>
      </div>
    </div>
  )
}

function getAqiVisuals(aqi: number) {
  if (aqi <= 50) return { bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-100', badgeColor: 'bg-green-200 text-green-800', emoji: '🌿' }
  if (aqi <= 100) return { bgGradient: 'bg-gradient-to-br from-yellow-50 to-amber-100', badgeColor: 'bg-yellow-200 text-yellow-800', emoji: '🌤️' }
  if (aqi <= 150) return { bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100', badgeColor: 'bg-orange-200 text-orange-800', emoji: '😷' }
  return { bgGradient: 'bg-gradient-to-br from-red-50 to-red-100', badgeColor: 'bg-red-200 text-red-800', emoji: '⚠️' }
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