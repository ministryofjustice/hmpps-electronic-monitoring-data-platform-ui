import type { Response } from 'express'
import { AuthenticatedRequest } from '../authentication/auth'
import LocationService from '../services/locationService'
import DeviceDetailViewModel from '../viewModels/device'
import Device from '../data_models/device'
import DeviceService from '../services/deviceService'

export default class DeviceController {
  constructor(private readonly locationService: LocationService, private readonly deviceService: DeviceService) {}

  // Ensure the data passed to the view conforms to the model
  private renderDeviceLocationListView(res: Response, data: DeviceDetailViewModel): void {
    res.render('pages/device/list', data)
  }

  async listLocations({ user, params: { deviceWearerId, deviceId } }: AuthenticatedRequest, res: Response) {
    const validatedWearerId = deviceWearerId.toString()
    const validatedDeviceId = deviceId.toString()
    try {
      const device: Device = await this.deviceService.findDeviceById(user.token, deviceId)
      const locations = await this.locationService.findByDeviceId(user.token, validatedDeviceId)
      this.renderDeviceLocationListView(res, {
        isError: false,
        locations,
        backLink: `/device-wearers/id/${validatedWearerId}`,
        device,
      })
    } catch (err) {
      this.renderDeviceLocationListView(res, {
        isError: true,
        error: err.message,
        locations: [],
        backLink: `/device-wearers/id/${validatedWearerId}`,
        device: null,
      })
    }
  }
}
