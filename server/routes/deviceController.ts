import type { Response } from 'express'
import { AuthenticatedRequest } from '../authentication/auth'
import LocationService from '../services/locationService'
import { LocationListViewModel } from '../viewModels/location'

export default class DeviceController {

  constructor(private readonly locationService: LocationService) {}

  // Ensure the data passed to the view conforms to the model
  private renderDeviceLocationListView(res: Response, data: LocationListViewModel): void {
    res.render('pages/device/list', data)
  }

  async listLocations({ user, params: { deviceWearerId } }: AuthenticatedRequest, res: Response) {
    try {
      const locations = await this.locationService.findMany(user.token, deviceWearerId.toString())
      this.renderDeviceLocationListView(res, {
        locations: locations,
        isError: false,
        searchTerm: '',
      })
    } catch (err) {
      this.renderDeviceLocationListView(res, {
        locations: [],
        searchTerm: '',
        isError: true,
        error: err.message,
      })
    }
  }

}
