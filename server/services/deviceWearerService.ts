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
    let result: DeviceWearer
    try {
      logger.debug(`calling deviceWearerService.findOne`)

      const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearer', DeviceWearer>>({
        path: `/device-wearers/v1/id/${deviceWearerId}`,
      })
      result = response.deviceWearer
    } catch (e) {
      logger.error({ err: e }, 'failed to fetch')
      throw e
    }
    return result
  }

  async findMany(accessToken: string, searchTerm: string = null): Promise<Array<DeviceWearer>> {
    let result: Array<DeviceWearer>
    try {
      logger.debug(`calling deviceWearerService.findMany, with searchterm ${searchTerm}`)
      if (searchTerm) {
        const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearer', DeviceWearer[]>>({
          path: `/device-wearers/v2/search/${searchTerm}`,
        })
        result = response.deviceWearer
      } else {
        const response = await this.restClient(accessToken).get<ApiResponse<'deviceWearer', DeviceWearer[]>>({
          path: `/device-wearers/v1`,
        })
        result = response.deviceWearer
      }
    } catch (e) {
      logger.error({ err: e }, 'failed to fetch')
      throw e
    }
    return result
  }
}
