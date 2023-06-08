// const axios = require('axios')

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
  {
    deviceWearerId: '987654321',
    firstName: 'J',
    lastName: 'Doe',
    type: 'Inclusion Zone',
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
    // const URL = 'http://localhost:8081/device-wearers/v1'
    let response = dummyData
    // try {
    //   response = axios.get(URL)
    // } catch {
    //   response = dummyData
    // }

    if (accessToken) {
      throw new Error(`Access token supplied but not yet supported!`)
    }

    if (searchTerm) {
      const userSearchTerm = searchTerm
      response = response.filter(deviceWearer => deviceWearer.firstName === userSearchTerm)
    }

    return response
  }
}
