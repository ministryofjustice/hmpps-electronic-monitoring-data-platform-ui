import config from '../config'
import RestClient from '../data/restClient'
import Location from '../data_models/location'
import { ApiResponse } from '../utils/utils'

export default class LocationService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findByDeviceId(accessToken: string, deviceId: string): Promise<Array<Location>> {
    try {
      const response = await this.restClient(accessToken).get<ApiResponse<'location', Location[]>>({
        path: `/location/v1/device-id/${deviceId}`,
      })
      return response.location
    } catch (err) {
      throw new Error(`Unable to find locations for ${deviceId}`)
    }
  }
}
