import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const campus = (searchParams.get('campus') || 'ucla').toLowerCase()

  // Seed data — replace with Supabase query later
  const listingsByCampus: Record<string, any[]> = {
    ucla: [
      { id: 'l1', title: 'Kelton Apt Garage', lat: 34.06499, lng: -118.44654, pricePerDay: 9,  spotType: 'garage',  availability: 'daily',   distanceMi: 0.4 },
      { id: 'l2', title: 'Veteran Ave Driveway', lat: 34.05881, lng: -118.45119, pricePerDay: 7,  spotType: 'driveway',availability: 'daily',   distanceMi: 0.7 },
      { id: 'l3', title: 'Midvale Covered Spot', lat: 34.06085, lng: -118.45262, pricePerDay: 11, spotType: 'covered',availability: 'monthly', distanceMi: 0.9 },
      { id: 'l4', title: 'Westwood Event Parking', lat: 34.06431, lng: -118.44501, pricePerDay: 18, spotType: 'open',  availability: 'event',   distanceMi: 0.5 },
      { id: 'l5', title: 'Strathmore Garage',     lat: 34.06408, lng: -118.44878, pricePerDay: 10, spotType: 'garage',  availability: 'daily',   distanceMi: 0.3 },
      { id: 'l6', title: 'Levering Dr Driveway',  lat: 34.06612, lng: -118.44992, pricePerDay: 8,  spotType: 'driveway',availability: 'monthly', distanceMi: 0.6 },
    ],
    usc: [
      { id: 'u1', title: 'Figueroa Parking Lot', lat: 34.02255, lng: -118.28556, pricePerDay: 10, spotType: 'open',    availability: 'daily',   distanceMi: 0.3 },
      { id: 'u2', title: 'Vermont Ave Garage',   lat: 34.02405, lng: -118.28398, pricePerDay: 12, spotType: 'garage',  availability: 'daily',   distanceMi: 0.4 },
      { id: 'u3', title: 'Hoover St Driveway',   lat: 34.02115, lng: -118.28745, pricePerDay: 8,  spotType: 'driveway',availability: 'monthly', distanceMi: 0.5 },
      { id: 'u4', title: 'Exposition Covered',   lat: 34.01885, lng: -118.28621, pricePerDay: 14, spotType: 'covered', availability: 'event',   distanceMi: 0.6 },
      { id: 'u5', title: 'Trousdale Garage',     lat: 34.02521, lng: -118.28215, pricePerDay: 11, spotType: 'garage',  availability: 'daily',   distanceMi: 0.3 },
      { id: 'u6', title: 'Jefferson Blvd Spot',  lat: 34.02689, lng: -118.28892, pricePerDay: 9,  spotType: 'open',    availability: 'monthly', distanceMi: 0.7 },
    ],
    berkeley: [
      { id: 'b1', title: 'Telegraph Ave Garage', lat: 37.86951, lng: -122.25897, pricePerDay: 12, spotType: 'garage',  availability: 'daily',   distanceMi: 0.2 },
      { id: 'b2', title: 'Durant Ave Driveway',  lat: 37.86785, lng: -122.25645, pricePerDay: 10, spotType: 'driveway',availability: 'daily',   distanceMi: 0.3 },
      { id: 'b3', title: 'College Ave Covered',  lat: 37.87432, lng: -122.25412, pricePerDay: 15, spotType: 'covered', availability: 'monthly', distanceMi: 0.5 },
      { id: 'b4', title: 'Bancroft Way Parking', lat: 37.86889, lng: -122.26125, pricePerDay: 18, spotType: 'open',    availability: 'event',   distanceMi: 0.4 },
      { id: 'b5', title: 'Channing Garage',      lat: 37.86655, lng: -122.25998, pricePerDay: 11, spotType: 'garage',  availability: 'daily',   distanceMi: 0.3 },
      { id: 'b6', title: 'Dwight Way Spot',      lat: 37.86512, lng: -122.25789, pricePerDay: 9,  spotType: 'driveway',availability: 'monthly', distanceMi: 0.6 },
    ],
    ucsd: [
      { id: 's1', title: 'Gilman Dr Garage',     lat: 32.87895, lng: -117.23456, pricePerDay: 8,  spotType: 'garage',  availability: 'daily',   distanceMi: 0.3 },
      { id: 's2', title: 'La Jolla Village Dr',  lat: 32.88125, lng: -117.23215, pricePerDay: 10, spotType: 'open',    availability: 'daily',   distanceMi: 0.4 },
      { id: 's3', title: 'Nobel Dr Driveway',    lat: 32.87655, lng: -117.23698, pricePerDay: 7,  spotType: 'driveway',availability: 'monthly', distanceMi: 0.5 },
      { id: 's4', title: 'Voigt Dr Covered',     lat: 32.88325, lng: -117.23892, pricePerDay: 12, spotType: 'covered', availability: 'event',   distanceMi: 0.6 },
      { id: 's5', title: 'Torrey Pines Garage',  lat: 32.87445, lng: -117.23125, pricePerDay: 9,  spotType: 'garage',  availability: 'daily',   distanceMi: 0.4 },
      { id: 's6', title: 'Genesee Ave Spot',     lat: 32.88565, lng: -117.23445, pricePerDay: 11, spotType: 'open',    availability: 'monthly', distanceMi: 0.7 },
    ],
    ucsb: [
      { id: 'sb1', title: 'IV Theater Parking',    lat: 34.41450, lng: -119.86150, pricePerDay: 9,  spotType: 'open',    availability: 'daily',   distanceMi: 0.3 },
      { id: 'sb2', title: 'Del Playa Driveway',    lat: 34.41280, lng: -119.85890, pricePerDay: 11, spotType: 'driveway',availability: 'daily',   distanceMi: 0.4 },
      { id: 'sb3', title: 'Storke Tower Garage',   lat: 34.41650, lng: -119.84520, pricePerDay: 10, spotType: 'garage',  availability: 'monthly', distanceMi: 0.5 },
      { id: 'sb4', title: 'Campus Point Covered',  lat: 34.41895, lng: -119.84195, pricePerDay: 13, spotType: 'covered', availability: 'event',   distanceMi: 0.6 },
      { id: 'sb5', title: 'Camino Corto Spot',     lat: 34.41325, lng: -119.86425, pricePerDay: 8,  spotType: 'open',    availability: 'daily',   distanceMi: 0.2 },
      { id: 'sb6', title: 'Pardall Rd Garage',     lat: 34.41580, lng: -119.85720, pricePerDay: 12, spotType: 'garage',  availability: 'monthly', distanceMi: 0.4 },
    ],
    csuf: [
      { id: 'f1', title: 'State College Garage',   lat: 33.88205, lng: -117.88695, pricePerDay: 8,  spotType: 'garage',  availability: 'daily',   distanceMi: 0.2 },
      { id: 'f2', title: 'Nutwood Ave Parking',    lat: 33.87950, lng: -117.88425, pricePerDay: 7,  spotType: 'open',    availability: 'daily',   distanceMi: 0.3 },
      { id: 'f3', title: 'Yorba Linda Driveway',   lat: 33.88450, lng: -117.88125, pricePerDay: 9,  spotType: 'driveway',availability: 'monthly', distanceMi: 0.4 },
      { id: 'f4', title: 'Commonwealth Covered',   lat: 33.88095, lng: -117.88895, pricePerDay: 12, spotType: 'covered', availability: 'event',   distanceMi: 0.5 },
      { id: 'f5', title: 'Fullerton Blvd Garage',  lat: 33.87755, lng: -117.88565, pricePerDay: 10, spotType: 'garage',  availability: 'daily',   distanceMi: 0.3 },
      { id: 'f6', title: 'Associated Rd Spot',     lat: 33.88325, lng: -117.88295, pricePerDay: 8,  spotType: 'open',    availability: 'monthly', distanceMi: 0.4 },
    ],
  }

  const listings = listingsByCampus[campus] || listingsByCampus.ucla

  return NextResponse.json({ campus, listings })
}
