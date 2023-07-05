import type { Response } from 'express'
import { AuthenticatedRequest } from '../authentication/auth'
import LocationService from '../services/locationService'
import LocationListViewModel from '../viewModels/location'

export default class DeviceController {
  constructor(private readonly locationService: LocationService) {}

  // Ensure the data passed to the view conforms to the model
  private renderDeviceLocationListView(res: Response, data: LocationListViewModel): void {
    res.render('pages/device/list', data)
  }

  async listLocations({ user, params: { deviceWearerId, deviceId } }: AuthenticatedRequest, res: Response) {
    const validatedWearerId = deviceWearerId.toString()
    const validatedDeviceId = deviceId.toString()
    try {
      const locations = await this.locationService.findByDeviceId(user.token, validatedDeviceId)
      this.renderDeviceLocationListView(res, {
        isError: false,
        locations,
        searchTerm: '',
        backLink: `/device-wearers/id/${validatedWearerId}`,
        deviceId: validatedDeviceId,
      })
    } catch (err) {
      this.renderDeviceLocationListView(res, {
        isError: true,
        error: err.message,
        locations: [],
        searchTerm: '',
        backLink: `/device-wearers/id/${validatedWearerId}`,
        deviceId: validatedDeviceId,
      })
    }
  }
}
