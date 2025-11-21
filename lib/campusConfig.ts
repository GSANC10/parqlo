export type CampusKey = 'ucla' | 'usc' | 'berkeley' | 'ucsd'

export const campusConfig: Record<CampusKey, {
  name: string
  center: [number, number] // [lng, lat]
  zoom: number
}> = {
  ucla:     { name: 'UCLA',        center: [-118.44242, 34.07389], zoom: 13 },
  usc:      { name: 'USC',         center: [-118.28553, 34.02242], zoom: 14 },
  berkeley: { name: 'UC Berkeley', center: [-122.25909, 37.87196], zoom: 14 },
  ucsd:     { name: 'UC San Diego',center: [-117.23591, 32.87946], zoom: 15 },
}

// Haversine distance in kilometers
export function distanceKm([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const R = 6371
  const dLat = (lat2-lat1) * Math.PI/180
  const dLng = (lng2-lng1) * Math.PI/180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*
            Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}
