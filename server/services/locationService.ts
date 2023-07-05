
import RestClient from '../data/restClient'
import {Location, locationResponse} from '../data_models/location'

export default class LocationService {
  private restClient: RestClient

  constructor(injectedRestClient: RestClient) {
    this.restClient = injectedRestClient
  }

  // private restClient(token: string) {
  //   return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  // }

  // eslint-disable-next-line consistent-return
  async findByDeviceWearer(accessToken: string, deviceId: string): Promise<Array<Location>> {
    try {
      const dummyResponse = true
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
      // const response = await this.restClient(accessToken).get<ApiResponse<'location', Location[]>>({
      //   path: `/location/v1/device-id/${deviceId}`,
      //   // path: `/deviceId/`,
      // })
      // return response.location
    } catch (err) {
      throw new Error(`Unable to find locations for ${deviceId}`)
    }
  }

  async findMany(accessToken: string, deviceWearerId: string): Promise<Array<Location>> {
    let result: locationResponse
    return [
      {
        latitude: '20.0',
        longitude: '20.0',
        locationTime: '2023:12:12T12:34:00',
      },
      {
        latitude: '21.0',
        longitude: '21.0',
        locationTime: '2023:12:12T12:34:00',
      },
    ]
    // try {
    //   logger.debug(`calling deviceService.findMany, with searchterm ${searchTerm}`)
    //   result = (await this.restClient.get({
    //     path: `/device/v1/device-wearer-id/${deviceWearerId}/search/${searchTerm}`,
    //   })) as DeviceResponse
    // } catch (e) {
    //   logger.error({ err: e }, 'failed to fetch')
    //   throw e
    // }
    // return result
  }
}

// export {Device}
