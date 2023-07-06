import { BaseErrorModel, BaseSuccessModel } from '.'
import Device from '../data_models/device'

// deviceWearers MUST be an empty list if an error occured
// error MUST be null if there are 0 or more deviceWearers
type LocationListViewModel =
  | (BaseErrorModel & { locations: []; device: null; searchTerm: string; deviceId: string; backLink: string })
  | (BaseSuccessModel & {
      locations: Array<Location>
      device: Device
      searchTerm: string
      deviceId: string
      backLink: string
    })

export default LocationListViewModel
