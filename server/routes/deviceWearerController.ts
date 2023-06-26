import type { Response } from 'express'
import DeviceWearerService from '../services/deviceWearerService'
import { AuthenticatedRequest } from '../authentication/auth'
import { DeviceWearerDetailViewModel, DeviceWearerListViewModel } from '../viewModels/DeviceWearer'

export default class DeviceWearerController {
  constructor(private readonly deviceWearerService: DeviceWearerService) {}

  // Ensure the data passed to the view conforms to the model
  private renderDeviceWearerListView(res: Response, data: DeviceWearerListViewModel): void {
    res.render('pages/deviceWearer/list', data)
  }

  // Ensure the data passed to the view conforms to the model
  private renderDeviceWearerDetailView(res: Response, data: DeviceWearerDetailViewModel): void {
    res.render('pages/deviceWearer/detail', data)
  }

  async listDeviceWearers({ user, query: { search = '' } }: AuthenticatedRequest, res: Response) {
    try {
      const deviceWearerResponse = await this.deviceWearerService.findMany(user.token, search.toString())
      this.renderDeviceWearerListView(res, {
        deviceWearers: deviceWearerResponse.deviceWearers,
        error: null,
        searchTerm: search.toString(),
      })
    } catch (err) {
      this.renderDeviceWearerListView(res, {
        deviceWearers: [],
        error: err.message,
        searchTerm: search.toString(),
      })
    }
  }

  async viewDeviceWearer({ user, params: { deviceWearerId } }: AuthenticatedRequest, res: Response) {
    try {
      const deviceWearerResponse = await this.deviceWearerService.findOne(user.token, deviceWearerId)
      this.renderDeviceWearerDetailView(res, {
        deviceWearer: deviceWearerResponse.deviceWearers[0],
        error: null,
      })
    } catch (err) {
      this.renderDeviceWearerDetailView(res, {
        deviceWearer: null,
        error: err.message,
      })
    }
  }
}
