import { useWeatherData } from '../hooks/useWeatherData'

export function WeatherWidget({ city }: { city: string }) {
  const { data, isLoading, error } = useWeatherData(city)

  if (isLoading) return <div className="p-4">Loading weather...</div>
  if (error) return <div className="p-4 text-red-500">Failed to load weather</div>

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{data?.city}</h3>
      <p className="text-3xl font-bold">{data?.temp}°C</p>
      <p className="text-sm text-gray-500 capitalize">{data?.description}</p>
      <p className="text-sm text-gray-500">Feels like {data?.feelsLike}°C</p>
    </div>
  )
}