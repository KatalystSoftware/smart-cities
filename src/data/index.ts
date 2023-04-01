// image naming scheme: {place}-{variant}.jpg
// place = object key in mockPlaces

export const mockPlaces = {
  miestentie: {
    latitude: 60.179469707555974,
    longtitude: 24.82547910980197,
    variants: ["original", "field", "flowers", "skatepark"],
  },
  koff: {
    latitude: 60.16108,
    longtitude: 24.93413,
    variants: ["original", "bush", "flowers", "playground"],
  },
  tuas: {
    latitude: 60.18751822007836,
    longtitude: 24.821056834534467,
    variants: ["original", "field", "flowers", "playground"],
  },
  otaniemi: {
    latitude: 60.188984,
    longtitude: 24.83447,
    variants: ["original", "flowers", "tree", "windmill"],
  },
  urheilupuisto: {
    latitude: 60.17373,
    longtitude: 24.77936,
    variants: ["original", "onelane", "bike", "tram"],
  },
  vermo: {
    latitude: 60.21655,
    longtitude: 24.82842,
    variants: ["original", "vines", "lush", "fence"],
  },
} as const;

export type Place = keyof typeof mockPlaces;
export type PlaceVariant = (typeof mockPlaces)[Place]["variants"][number];
