import type { ParkingSpot } from '@/components/CampusParkingMap'

export const campusConfig = {
  ucla: {
    name: 'UCLA',
    center: [-118.4426, 34.0723] as [number, number],
    zoom: 12,
  },
  usc: {
    name: 'USC',
    center: [-118.2856, 34.0224] as [number, number],
    zoom: 13,
  },
  berkeley: {
    name: 'UC Berkeley',
    center: [-122.2595, 37.8719] as [number, number],
    zoom: 13,
  },
  ucsd: {
    name: 'UC San Diego',
    center: [-117.235, 32.8801] as [number, number],
    zoom: 14,
  },
  ucsb: {
    name: 'UCSB',
    center: [-119.84895, 34.41396] as [number, number],
    zoom: 13,
  },
  csuf: {
    name: 'CSUF',
    center: [-117.88528, 33.88056] as [number, number],
    zoom: 13,
  },
} as const;

// Sample parking spots for demo purposes
// In production, these will come from your database via API
export const sampleParkingSpots: Record<CampusSlug, ParkingSpot[]> = {
  ucla: [
    {
      id: '1',
      coordinates: [-118.4450, 34.0710],
      name: 'Kelton Garage',
      price: '$9'
    },
    {
      id: '2',
      coordinates: [-118.4480, 34.0690],
      name: 'Veteran Ave',
      price: '$7'
    },
    {
      id: '3',
      coordinates: [-118.4400, 34.0740],
      name: 'Midvale Covered',
      price: '$11'
    }
  ],
  usc: [
    {
      id: '4',
      coordinates: [-118.2880, 34.0210],
      name: 'Figueroa Lot',
      price: '$10'
    },
    {
      id: '5',
      coordinates: [-118.2840, 34.0240],
      name: 'Vermont Spot',
      price: '$8'
    }
  ],
  berkeley: [
    {
      id: '6',
      coordinates: [-122.2610, 37.8700],
      name: 'Telegraph Ave',
      price: '$12'
    },
    {
      id: '7',
      coordinates: [-122.2570, 37.8740],
      name: 'College Ave Garage',
      price: '$9'
    }
  ],
  ucsd: [
    {
      id: '8',
      coordinates: [-117.2370, 32.8790],
      name: 'Gilman Parking',
      price: '$8'
    },
    {
      id: '9',
      coordinates: [-117.2330, 32.8810],
      name: 'La Jolla Village',
      price: '$10'
    }
  ],
  ucsb: [
    {
      id: '10',
      coordinates: [-119.8500, 34.4150],
      name: 'IV Parking',
      price: '$9'
    },
    {
      id: '11',
      coordinates: [-119.8470, 34.4130],
      name: 'Del Playa Spot',
      price: '$11'
    }
  ],
  csuf: [
    {
      id: '12',
      coordinates: [-117.8870, 33.8820],
      name: 'State College Garage',
      price: '$8'
    },
    {
      id: '13',
      coordinates: [-117.8840, 33.8795],
      name: 'Nutwood Parking',
      price: '$7'
    }
  ]
}

export type CampusSlug = keyof typeof campusConfig;

export interface Campus {
  slug: CampusSlug;
  name: string;
  center: [number, number];
  zoom: number;
  parkingSpots?: ParkingSpot[];
}

// Convert config object to array for iteration with sample parking spots
export const campuses: Campus[] = Object.entries(campusConfig).map(([slug, config]) => ({
  slug: slug as CampusSlug,
  ...config,
  parkingSpots: sampleParkingSpots[slug as CampusSlug],
}));

// Helper function to get campus by slug
export function getCampusBySlug(slug: string): Campus | undefined {
  return campuses.find(c => c.slug === slug);
}
