import config from '../config'
import RestClient from '../data/restClient'
import { ApiResponse } from '../utils/utils'
import Device from '../data_models/device'

export default class DeviceService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findByDeviceWearer(accessToken: string, deviceWearerId: string): Promise<Array<Device>> {
    try {
      const dummyResponse = false
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
      })
      return response.devices
    } catch (err) {
      throw new Error(`Unable to find devices for ${deviceWearerId}`)
    }
  }

  async findDeviceById(token: string, deviceId: string): Promise<Device> {
    try {
      const dummyResponse = false
      if (dummyResponse) {
        return {
          deviceId: '8225d883-0fd1-4456-aeba-f7701412d35e',
          deviceType: 'RF',
          status: 'Not fitted',
          dateTagFitted: 'yesterday',
          dateTagRemoved: 'today',
        }
      }
      const response = await this.restClient(token).get<ApiResponse<'device', Device>>({
        path: `/devices/v1/device-id/${deviceId}`,
      })
      return response.device
    } catch (err) {
      throw new Error(`Unable to find device with id ${deviceId}`)
    }
  }
}
