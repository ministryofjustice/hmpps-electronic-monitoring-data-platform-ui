import { BaseErrorModel, BaseSuccessModel } from '.'

// deviceWearers MUST be an empty list if an error occured
// error MUST be null if there are 0 or more deviceWearers
type LocationListViewModel =
  | (BaseErrorModel & { locations: []; searchTerm: string; deviceId: string; backLink: string })
  | (BaseSuccessModel & { locations: Array<Location>; searchTerm: string; deviceId: string; backLink: string })

export default LocationListViewModel
