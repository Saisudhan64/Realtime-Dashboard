import { useQuery } from '@tanstack/react-query'
import { fetchWeather } from '../services/weatherService'

export function useWeatherData(city: string) {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    refetchInterval: 60000, // auto-refetch every 60 seconds
    retry:1
  })
}