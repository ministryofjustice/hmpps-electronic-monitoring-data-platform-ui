import { dataAccess } from '../data'
import UserService from './userService'
import DeviceWearerService from './deviceWearerService'
import RestClient from '../data/restClient'
import config from '../config'

export const services = () => {
  const { hmppsAuthClient, applicationInfo } = dataAccess()

  const userService = new UserService(hmppsAuthClient)
  const deviceWearerService = new DeviceWearerService(
    new RestClient('Device Wearer Client', config.apis.deviceWearer, null),
  )

  return {
    applicationInfo,
    userService,
    deviceWearerService,
  }
}

export type Services = ReturnType<typeof services>

export { UserService }
