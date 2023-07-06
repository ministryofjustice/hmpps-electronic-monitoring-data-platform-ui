import { dataAccess } from '../data'
import UserService from './userService'
import DeviceWearerService from './deviceWearerService'
import DeviceService from './deviceService'
import LocationService from './locationService'

export const services = () => {
  const { hmppsAuthClient, applicationInfo } = dataAccess()
  const userService = new UserService(hmppsAuthClient)
  const deviceWearerService = new DeviceWearerService()
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
