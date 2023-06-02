import { dataAccess } from '../data'
import UserService from './userService'
import DeviceWearerService from './deviceWearerService'

export const services = () => {
  const { hmppsAuthClient, applicationInfo } = dataAccess()

  const userService = new UserService(hmppsAuthClient)
  const deviceWearerService = new DeviceWearerService()

  return {
    applicationInfo,
    userService,
    deviceWearerService,
  }
}

export type Services = ReturnType<typeof services>

export { UserService }
