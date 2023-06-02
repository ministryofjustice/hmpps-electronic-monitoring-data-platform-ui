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
    return dummyData[0]
  }

  async findMany(accessToken: string, searchTerm: string): Promise<Array<DeviceWearer>> {
    return dummyData
  }
}
