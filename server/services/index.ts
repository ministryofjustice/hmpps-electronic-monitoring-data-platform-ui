import { dataAccess } from '../data'
import UserService from './userService'
import DeviceWearerService from './deviceWearerService'
import RestClient from '../data/restClient'
import config from '../config'
import DeviceService from './deviceService'
import LocationService from './locationService'

export const services = () => {
  const { hmppsAuthClient, applicationInfo } = dataAccess()

  const dataPlatformApi = new RestClient('Device Wearer Client', config.apis.deviceWearer, null)

  const userService = new UserService(hmppsAuthClient)
  const deviceWearerService = new DeviceWearerService(dataPlatformApi)
  const deviceService = new DeviceService()
  const locationService = new LocationService()

  return {
    applicationInfo,
    userService,
    deviceWearerService,
    deviceService,
    locationService,
  }
}

export type Services = ReturnType<typeof services>

export { UserService }
