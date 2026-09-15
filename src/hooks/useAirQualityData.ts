import { useQuery } from '@tanstack/react-query'
import { fetchAirQuality } from '../services/airQualityService'

export function useAirQualityData(city: string) {
  return useQuery({
    queryKey: ['airQuality', city],
    queryFn: () => fetchAirQuality(city),
    refetchInterval: 60000,
  })
}