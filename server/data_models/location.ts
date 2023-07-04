type Location = {
  latitude: string
  longitude: string
  locationTime: string
}

type locationResponse = {
  error: string
  location: Location[]
}

export { Location, locationResponse }
