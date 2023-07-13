import { BaseErrorModel, BaseSuccessModel } from '.'
import Device from '../data_models/device'
import Location from '../data_models/location'

type DeviceDetailViewModel =
  | BaseErrorModel
  | (BaseErrorModel & { device: Device; backLink: string })
  | (BaseSuccessModel & {
      device: Device
      locations: Array<Location>
      backLink: string
      startDate: string
      endDate: string
    })

export default DeviceDetailViewModel
