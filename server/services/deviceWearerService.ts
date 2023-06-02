export type DeviceWearer = {
  deviceWearerId: string
  firstName: string
  lastName: string
  type: string // Enum??
}

const dummyData = [
  {
    deviceWearerId: '123456789',
    firstName: 'J',
    lastName: 'Smith',
    type: 'Curfew',
  },
]

export default class DeviceWearerService {
  async findOne(accessToken: string, deviceWearerId: string): Promise<DeviceWearer> {
    const searchResult = dummyData.find(deviceWearer => deviceWearer.deviceWearerId === deviceWearerId)

    if (!searchResult) {
      throw new Error(`Unknown device wearer id: ${deviceWearerId}`)
    }

    return searchResult
  }

  async findMany(accessToken: string, searchTerm: string): Promise<Array<DeviceWearer>> {
    return dummyData
  }
}