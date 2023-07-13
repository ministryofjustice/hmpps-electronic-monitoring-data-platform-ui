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
    res.render('pages/device/detail', data)
  }

  async listLocations(
    { user, params: { deviceWearerId, deviceId }, query: { startDate = '', endDate = '' } }: AuthenticatedRequest,
    res: Response,
  ) {
    const validatedWearerId = deviceWearerId.toString()
    const validatedDeviceId = deviceId.toString()

    const validStartDate = startDate ? startDate.toString() : ''
    const validEndDate = endDate ? endDate.toString() : ''

    try {
      const device: Device = await this.deviceService.findDeviceById(user.token, deviceId)
      const locations = await this.locationService.findByDeviceIdAndDateRange(
        user.token,
        validatedDeviceId,
        validStartDate,
        validEndDate,
      )
      this.renderDeviceLocationListView(res, {
        isError: false,
        locations,
        backLink: `/device-wearers/id/${validatedWearerId}`,
        device,
        searchUrl: `/device/${deviceWearerId}/${deviceId}`,
        startDate: validStartDate,
        endDate: validEndDate,
      })
    } catch (err) {
      this.renderDeviceLocationListView(res, {
        isError: true,
        error: err.message,
        locations: [],
        backLink: `/device-wearers/id/${validatedWearerId}`,
        device: null,
        searchUrl: `/device/${deviceWearerId}/${deviceId}`,
        startDate: validStartDate,
        endDate: validEndDate,
      })
    }
  }
}
