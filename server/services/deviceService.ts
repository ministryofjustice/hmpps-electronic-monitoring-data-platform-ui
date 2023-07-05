import config from '../config'
import RestClient from '../data/restClient'
import { ApiResponse } from '../utils/utils'
// import {DeviceWearerResponse} from "../data_models/deviceWearer";
// import logger from "../../logger";
import { Device, DeviceResponse } from '../data_models/device'

// type DeviceType =
//     | 'Location - fitted'
//     | 'RF'
//     | 'Location - non-fitted'
//     | 'Alcohol (Transdermal)'
//     | 'Alcohol (Remote Breath)'
//
// type DeviceStatus = 'Not fitted' | 'Fitted' | 'Removed'
//
// type Device = {
//   deviceId: string
//   deviceType: DeviceType
//   status: DeviceStatus
//   dateTagFitted: string
//   dateTagRemoved: string
// }

export default class DeviceService {
  // private restClient: RestClient

  // constructor(injectedRestClient: RestClient) {
  //   this.restClient = injectedRestClient
  // }

  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findByDeviceWearer(accessToken: string, deviceWearerId: string): Promise<Array<Device>> {
    try {
      const dummyResponse = true
      if (dummyResponse) {
        return [
          {
            deviceId: '8225d883-0fd1-4456-aeba-f7701412d35e',
            deviceType: 'RF',
            status: 'Not fitted',
            dateTagFitted: 'yesterday',
            dateTagRemoved: 'today',
          },
          {
            deviceId: '8225d883-0fd1-4456-aeba-f7701412d35a',
            deviceType: 'RF',
            status: 'Not fitted',
            dateTagFitted: '2008-11-10',
            dateTagRemoved: '2022-05-05',
          },
        ]
      }
      const response = await this.restClient(accessToken).get<ApiResponse<'devices', Device[]>>({
        path: `/devices/v1/device-wearer-id/${deviceWearerId}`,
        // path: `/devices/`,
      })
      return response.devices
    } catch (err) {
      throw new Error(`Unable to find devices for ${deviceWearerId}`)
    }
  }

  // async findByDeviceId(accessToken: string, deviceId: string): Promise<Array<Device>> {
  //   let result: DeviceResponse
  //   return [
  //     {
  //       deviceId: '8225d883-0fd1-4456-aeba-f7701412d35e',
  //       deviceType: 'RF',
  //       status: 'Not fitted',
  //       dateTagFitted: 'A',
  //       dateTagRemoved: 'Ok',
  //     },
  //   ]
  //   // try {
  //   //   logger.debug(`calling deviceService.findMany, with searchterm ${searchTerm}`)
  //   //   result = (await this.restClient.get({
  //   //     path: `/device/v1/device-wearer-id/${deviceWearerId}/search/${searchTerm}`,
  //   //   })) as DeviceResponse
  //   // } catch (e) {
  //   //   logger.error({ err: e }, 'failed to fetch')
  //   //   throw e
  //   // }
  //   // return result
  // }
}

// export {Device}
