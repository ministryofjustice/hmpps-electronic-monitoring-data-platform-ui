import logger from '../../logger'
import config from '../config'
import RestClient from '../data/restClient'

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

type ApiResponse<K extends string, T> = {
  [k in K]: T
}

export default class DeviceService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token) // TODO: Rename config
  }

  async findByDeviceWearer(accessToken: string, deviceWearerId: string): Promise<Array<Device>> {
    try {
      const response = await this.restClient(accessToken).get<ApiResponse<'devices', Device[]>>({
        path: `/devices/`,
      })

      return response.devices
    } catch (err) {
      throw new Error(`Unable to find devices for ${deviceWearerId}`)
    }
  }
}

export { Device }
