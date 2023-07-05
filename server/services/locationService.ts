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
      const dummyResponse = false
      if (dummyResponse) {
        return [
          {
            latitude: '20.0',
            longitude: '20.0',
            locationTime: '2023:12:12T12:34:00',
          },
          {
            latitude: '20.0',
            longitude: '20.0',
            locationTime: '2023:12:12T12:34:00',
          },
        ]
      }
      const response = await this.restClient(accessToken).get<ApiResponse<'location', Location[]>>({
        path: `/location/v1/device-id/${deviceId}`,
      })
      return response.location
    } catch (err) {
      throw new Error(`Unable to find locations for ${deviceId}`)
    }
  }
}
