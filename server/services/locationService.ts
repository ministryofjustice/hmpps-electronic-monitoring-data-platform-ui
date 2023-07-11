import config from '../config'
import RestClient from '../data/restClient'
import Location from '../data_models/location'
import { AddYears, ApiResponse } from '../utils/utils'

export default class LocationService {
  private restClient(token: string) {
    return new RestClient('Data Platform API Client', config.apis.deviceWearer, token)
  }

  async findByDeviceIdAndDateRange(
    accessToken: string,
    deviceId: string,
    startDateTime: string,
    endDateTime: string,
  ): Promise<Array<Location>> {
    try {
      const formattedStartDate = `${startDateTime}:00.000-00:00`
      let formattedEndDate = `${endDateTime}:00.000-00:00`
      let path = ''

      if (startDateTime && endDateTime) {
        path = `/locations/v1/search-by-time-and-device?deviceId=${deviceId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      } else if (startDateTime && !endDateTime) {
        formattedEndDate = AddYears(60, new Date()).toISOString()
        path = `/locations/v1/search-by-time-and-device?deviceId=${deviceId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      } else {
        path = `/locations/v1/device-id/${deviceId}`
      }
      const response = await this.restClient(accessToken).get<ApiResponse<'locations', Location[]>>({
        path,
      })
      return response.locations
    } catch (err) {
      throw new Error(`Unable to find locations for ${deviceId}`)
    }
  }
}
