import config from '../config'
import RestClient from '../data/restClient'
import { ApiResponse } from '../utils/utils'

type DeviceType =
  | 'Location - fitted'
  | 'RF'
  | 'Location - non-fitted'
  | 'Alcohol (Transdermal)'
  | 'Alcohol (Remote Breath)'

type DeviceStatus = 'Not fitted' | 'Fitted' | 'Removed'

type Device = {
  deviceId: string
  deviceType: DeviceType
  status: DeviceStatus
  dateTagFitted: string
  dateTagRemoved: string
}

export default class DeviceService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findByDeviceWearer(accessToken: string, deviceWearerId: string): Promise<Array<Device>> {
    try {
      const dummyResponse = false
      if (dummyResponse)
        return [
          {
            deviceId: '8225d883-0fd1-4456-aeba-f7701412d35e',
            deviceType: 'RF',
            status: 'Not fitted',
            dateTagFitted: 'A',
            dateTagRemoved: 'Ok',
          },
          {
            deviceId: '8225d883-0fd1-4456-aeba-f7701412d35a',
            deviceType: 'RF',
            status: 'Not fitted',
            dateTagFitted: 'B',
            dateTagRemoved: 'Ok',
          },
        ]
      const response = await this.restClient(accessToken).get<ApiResponse<'devices', Device[]>>({
        path: `/devices/v1/device-wearer-id/${deviceWearerId}`,
        // path: `/devices/`,
      })
      return response.devices
    } catch (err) {
      throw new Error(`Unable to find devices for ${deviceWearerId}`)
    }
  }
}

export { Device }
