import { CITY_COORDS } from '../utils/cityCoordinates'

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  location: string
}

export async function fetchAirQuality(city: string): Promise<AirQualityData> {
  const coords = CITY_COORDS[city]
  if (!coords) {
    throw new Error(`Coordinates not found for city: ${city}`)
  }

  const response = await fetch(
    `${BASE_URL}?latitude=${coords.lat}&longitude=${coords.lon}&current=pm10,pm2_5,us_aqi`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch air quality data')
  }

  const data = await response.json()

  return {
    aqi: data.current.us_aqi,
    pm25: data.current.pm2_5,
    pm10: data.current.pm10,
    location: city,
  }
}