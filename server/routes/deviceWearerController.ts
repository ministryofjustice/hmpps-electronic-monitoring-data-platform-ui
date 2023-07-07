import type { Response } from 'express'
import DeviceWearerService from '../services/deviceWearerService'
import { AuthenticatedRequest } from '../authentication/auth'
import { DeviceWearerDetailViewModel, DeviceWearerListViewModel } from '../viewModels/deviceWearer'
import DeviceService from '../services/deviceService'

export default class DeviceWearerController {
  constructor(
    private readonly deviceWearerService: DeviceWearerService,
    private readonly deviceService: DeviceService,
  ) {}

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
      const deviceWearers = await this.deviceWearerService.findMany(user.token, search.toString())
      this.renderDeviceWearerListView(res, {
        deviceWearers,
        isError: false,
        searchTerm: search.toString(),
      })
    } catch (err) {
      this.renderDeviceWearerListView(res, {
        deviceWearers: [],
        isError: true,
        error: err.message,
        searchTerm: search.toString(),
      })
    }
  }

  async viewDeviceWearer({ user, params: { deviceWearerId } }: AuthenticatedRequest, res: Response) {
    try {
      const [deviceWearerResult, devicesResult] = await Promise.allSettled([
        this.deviceWearerService.findOne(user.token, deviceWearerId),
        this.deviceService.findByDeviceWearer(user.token, deviceWearerId),
      ])

      if (deviceWearerResult.status === 'fulfilled' && devicesResult.status === 'fulfilled') {
        this.renderDeviceWearerDetailView(res, {
          deviceWearer: deviceWearerResult.value,
          devices: devicesResult.value,
          isError: false,
        })
      } else if (deviceWearerResult.status === 'fulfilled') {
        this.renderDeviceWearerDetailView(res, {
          deviceWearer: deviceWearerResult.value,
          error: (devicesResult as PromiseRejectedResult).reason,
          isError: true,
        })
      } else {
        this.renderDeviceWearerDetailView(res, {
          error: deviceWearerResult.reason,
          isError: true,
        })
      }
    } catch (err) {
      this.renderDeviceWearerDetailView(res, {
        error: err.message,
        isError: true,
      })
    }
  }
}
