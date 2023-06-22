type DeviceWearer = {
  deviceWearerId: string
  firstName: string
  lastName: string
  type: string
}

type DeviceWearerResponse = {
  error: string
  deviceWearers: DeviceWearer[]
}

export { DeviceWearer, DeviceWearerResponse }
