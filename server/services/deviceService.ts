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
  dateTagFitted: Date
  dateTagRemoved: Date
}

const inMemoryDatabase: Array<Device> = [
  {
    deviceId: '123456789',
    deviceType: 'Location - fitted',
    status: 'Removed',
    dateTagFitted: new Date(),
    dateTagRemoved: new Date(),
  },
]

export default class DeviceService {
  constructor(private readonly restClient: RestClient) {}

  async findByDeviceWearer(accessToken: string, deviceWearerId: string): Promise<Array<Device>> {
    return Promise.resolve(inMemoryDatabase)
  }
}

export { Device }
