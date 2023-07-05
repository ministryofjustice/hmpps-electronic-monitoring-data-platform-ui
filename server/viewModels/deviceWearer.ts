import { BaseErrorModel, BaseSuccessModel } from '.'
import DeviceWearer from '../data_models/deviceWearer'
import Device from '../data_models/device'

// deviceWearers MUST be an empty list if an error occured
// error MUST be null if there are 0 or more deviceWearers
type DeviceWearerListViewModel =
  | (BaseErrorModel & { deviceWearers: []; searchTerm: string })
  | (BaseSuccessModel & { deviceWearers: Array<DeviceWearer>; searchTerm: string })

type DeviceWearerDetailViewModel =
  | BaseErrorModel
  | (BaseErrorModel & { deviceWearer: DeviceWearer })
  | (BaseSuccessModel & { deviceWearer: DeviceWearer; devices: Array<Device> })

export { DeviceWearerListViewModel, DeviceWearerDetailViewModel }
