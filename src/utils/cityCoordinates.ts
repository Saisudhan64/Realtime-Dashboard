export interface Coordinates {
  lat: number
  lon: number
}

export const CITY_COORDS: Record<string, Coordinates> = {
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.7041, lon: 77.1025 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
}