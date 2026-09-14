const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

// Simple city coordinate lookup (Open-Meteo needs lat/lon, not city names)
const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.7041, lon: 77.1025 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
}

// WMO weather codes → human-readable description
function getWeatherDescription(code: number): string {
  const codes: Record<number, string> = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    51: 'light drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    80: 'rain showers',
    95: 'thunderstorm',
  }
  return codes[code] ?? 'unknown'
}

export interface WeatherData {
  temp: number
  feelsLike: number
  humidity: number
  description: string
  city: string
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const coords = CITY_COORDS[city]
  if (!coords) {
    throw new Error(`Coordinates not found for city: ${city}`)
  }

  const response = await fetch(
    `${BASE_URL}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  const data = await response.json()

  return {
    temp: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    description: getWeatherDescription(data.current.weather_code),
    city,
  }
}