// const axios = require('axios')

import RestClient from '../data/restClient'
// import config from '../config'
import logger from '../../logger'

export type DeviceWearer = {
  deviceWearerId: string
  firstName: string
  lastName: string
  type: string // Enum??
}

export default class DeviceWearerService {
  private restClient: RestClient

  constructor(injectedRestClient: RestClient) {
    this.restClient = injectedRestClient
  }

  async findOne(accessToken: string, deviceWearerId: string): Promise<DeviceWearer> {
    let result: DeviceWearer
    try {
      logger.debug(`calling deviceWearerService.findOne`)
      result = (await this.restClient.get({ path: `/device-wearers/v1/${deviceWearerId}` })) as DeviceWearer
      // remove line 25 and uncomment line 27 whenever the issue is fixed on api deployment
      // result = (await this.restClient.get({ path: `/device-wearers/v1/id/${deviceWearerId}` })) as DeviceWearer
    } catch (e) {
      logger.error({ err: e }, 'failed to fetch')
      throw e
    }
    return result
  }

  async findMany(accessToken: string, searchTerm: string): Promise<Array<DeviceWearer>> {
    let result: DeviceWearer[]
    try {
      logger.debug(`calling deviceWearerService.findMany, with searchterm ${searchTerm}`)
      result = (await this.restClient.get({ path: '/device-wearers/v1' })) as DeviceWearer[]
    } catch (e) {
      logger.error({ err: e }, 'failed to fetch')
      throw e
    }
    return result
  }
}
