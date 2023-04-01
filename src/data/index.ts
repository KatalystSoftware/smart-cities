// image naming scheme: {place}-{variant}.jpg
// place = object key in mockPlaces

export const mockPlaces = {
  "gas-station": {
    latitude: 60.179469707555974,
    longtitude: 24.82547910980197,
    variants: ["before", "after"],
  },
  park: {
    latitude: 60.173119,
    longtitude: 24.916141,
    variants: ["before", "after"],
  },
  "parking-lot": {
    latitude: 60.18751822007836,
    longtitude: 24.821056834534467,
    variants: ["before", "after"],
  },
  roundabout: {
    latitude: 60.188984,
    longtitude: 24.83447,
    variants: ["before", "after"],
  },
  "roundabout-alt": {
    latitude: 60.188984,
    longtitude: 24.83447,
    variants: ["before", "after"],
  },
  wall: {
    latitude: 60.21655,
    longtitude: 24.82842,
    variants: ["before", "after"],
  },
  default: {
    latitude: 60.1841,
    longtitude: 24.8301,
    variants: ["before", "after"],
  },
} as const;

export type Place = keyof typeof mockPlaces;
export type PlaceVariant = (typeof mockPlaces)[Place]["variants"][number];
