// const axios = require('axios')

import RestClient from '../data/restClient'
import config from '../config'
import logger from '../../logger'

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
  private restClient(): RestClient {
    return new RestClient('Device Wearer Client', config.apis.deviceWearer, null)
  }

  async findOne(accessToken: string, deviceWearerId: string): Promise<DeviceWearer> {
    const searchResult = dummyData.find(deviceWearer => deviceWearer.deviceWearerId === deviceWearerId)

    if (!searchResult) {
      throw new Error(`Unknown device wearer id: ${deviceWearerId}`)
    }

    return searchResult
  }

  async findMany(accessToken: string, searchTerm: string): Promise<Array<DeviceWearer>> {
    let result: DeviceWearer[]
    try {
      logger.debug(`calling deviceWearerService.findMany, with searchterm ${searchTerm}`)
      result = (await this.restClient().get({ path: '/device-wearers/v1' })) as DeviceWearer[]
    } catch (e) {
      logger.error({ err: e }, 'failed to fetch')
      throw e
    }
    return result
  }
}
