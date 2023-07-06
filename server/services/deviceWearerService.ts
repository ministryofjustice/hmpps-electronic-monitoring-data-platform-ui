import RestClient from '../data/restClient'
import logger from '../../logger'
import { ApiResponse } from '../utils/utils'
import DeviceWearer from '../data_models/deviceWearer'
import config from '../config'

export default class DeviceWearerService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findOne(accessToken: string, deviceWearerId: string): Promise<DeviceWearer> {
    try {
      logger.debug(`calling deviceWearerService.findOne`)
      const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearers', DeviceWearer[]>>({
        path: `/device-wearers/v1/id/${deviceWearerId}`,
      })
      if (response.deviceWearers.length === 0) {
        throw new Error(`No user found with ID ${deviceWearerId}`)
      }
      if (response.deviceWearers.length !== 1) {
        throw new Error(`Duplicate users found with ID ${deviceWearerId}`)
      }
      return response.deviceWearers[0]
    } catch (e) {
      logger.error({ err: e }, `Failure in DeviceWearerService.findOne with deviceWearerId ${deviceWearerId}`)
      throw e
    }
  }

  async findMany(accessToken: string, searchTerm: string = null): Promise<Array<DeviceWearer>> {
    let result: Array<DeviceWearer>
    try {
      logger.debug(`calling deviceWearerService.findMany, with searchterm ${searchTerm}`)
      if (searchTerm) {
        const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearers', DeviceWearer[]>>({
          path: `/device-wearers/v2/search/${searchTerm}`,
        })
        if (response.deviceWearers.length === 0) {
          throw new Error(`No matching users found with search term ${searchTerm}`)
        }
        result = response.deviceWearers
      } else {
        const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearers', DeviceWearer[]>>({
          path: `/device-wearers/v1`,
        })
        result = response.deviceWearers
      }
    } catch (e) {
      logger.error({ err: e }, `Failure in DeviceWearerService.findMany with searchterm ${searchTerm}`)
      throw e
    }
    return result
  }
}
