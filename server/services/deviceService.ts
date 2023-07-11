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
      const response = await this.restClient(token).get<ApiResponse<'device', Device>>({
        path: `/devices/v1/device-wearer-id/${deviceId}`,
      })
      return response.device
    } catch (err) {
      throw new Error(`Unable to find device with id ${deviceId}`)
    }
  }
}
